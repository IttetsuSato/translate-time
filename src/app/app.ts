import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface WindTimeResult {
  windSpeed: number;
  adjustedTime: number;
  advantage: number;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('100m風速調整計算機');
  
  // 入力値
  actualTime = signal<number>(10.0);
  windSpeed = signal<number>(0.0);
  
  // 計算結果
  noWindTime = computed(() => {
    const time = this.actualTime();
    const wind = this.windSpeed();
    if (time <= 0) return 0;
    return this.calculateWindAdjustment(0, time);
  });
  
  windTimeTable = computed(() => {
    const actualTime = this.actualTime();
    if (actualTime <= 0) return [];
    
    const results: WindTimeResult[] = [];
    for (let w = -2.0; w <= 2.0; w += 0.2) {
      const adjustedTime = this.calculateWindAdjustment(w, actualTime);
      const advantage = adjustedTime - actualTime;
      results.push({
        windSpeed: Math.round(w * 10) / 10, // 小数点の精度を調整
        adjustedTime: Math.round(adjustedTime * 1000) / 1000,
        advantage: Math.round(advantage * 1000) / 1000
      });
    }
    return results;
  });
  
  /**
   * 風速調整計算
   * @param w 風速 (m/s)
   * @param tw 実際のタイム (秒)
   * @returns 調整後タイム (秒)
   */
  private calculateWindAdjustment(w: number, tw: number): number {
    const sp = 100; // 100m
    const alt = 10; // 東京の高度
    const dens = Math.exp(-0.000125 * alt);
    
    const factor = 1.028 - 0.028 * dens * Math.pow(1.0 - (w * tw) / sp, 2);
    return factor * tw;
  }
  
  /**
   * 現在の風速での調整後タイム
   */
  getCurrentAdjustedTime(): number {
    const time = this.actualTime();
    const wind = this.windSpeed();
    if (time <= 0) return 0;
    return Math.round(this.calculateWindAdjustment(wind, time) * 1000) / 1000;
  }
  
  /**
   * 現在の風速での有利・不利
   */
  getCurrentAdvantage(): number {
    const adjustedTime = this.getCurrentAdjustedTime();
    const actualTime = this.actualTime();
    return Math.round((adjustedTime - actualTime) * 1000) / 1000;
  }
}
