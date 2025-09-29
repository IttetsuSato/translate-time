import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { CurrentWindResult } from "./current-wind-result";
import { TimeAndWindForm } from "./time-and-wind-form";
import { WindTimeTable } from "./wind-time-table";

interface WindTimeResult {
	windSpeed: number;
	adjustedTime: number;
	advantage: number;
}

@Component({
	selector: "app-root",
	imports: [
		RouterOutlet,
		FormsModule,
		CommonModule,
		TimeAndWindForm,
		CurrentWindResult,
		WindTimeTable,
	],
	template: `
		<div class="wind-calculator">
			<div class="header">
				<h1>{{ title() }}</h1>
				<p>100mのタイムと風速を入力して、無風換算タイムと各風速でのタイムを計算します</p>
			</div>

			<time-and-wind-form 
				[actualTime]="actualTime()" 
				[windSpeed]="windSpeed()"
				(actualTimeChange)="actualTime.set($event)"
				(windSpeedChange)="windSpeed.set($event)">
			</time-and-wind-form>

			@if (actualTime() > 0) {
				<div class="results-section">
					<!-- 現在の風速での結果 -->
					<current-wind-result
						[windSpeed]="windSpeed()"
						[adjustedTime]="adjustedTime()"
						[advantage]="getCurrentAdvantage()">
					</current-wind-result>

					<!-- 風速別タイム表 -->
					<wind-time-table
						[windTimeTable]="windTimeTable()"
						[currentWindSpeed]="windSpeed()">
					</wind-time-table>
				</div>
			} @else {
				<div class="no-data">
					<p>タイムを入力してください</p>
				</div>
			}
		</div>

		<router-outlet />
	`,
	styles: `
		/* 風速調整計算機のスタイル */
		.wind-calculator {
			max-width: 1200px;
			margin: 0 auto;
			padding: 2rem;
			font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
			background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
			min-height: 100vh;
		}

		.header {
			text-align: center;
			margin-bottom: 3rem;
		}

		.header h1 {
			color: #2c3e50;
			font-size: 2.5rem;
			font-weight: 600;
			margin-bottom: 1rem;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}

		.header p {
			color: #5a6c7d;
			font-size: 1.1rem;
			max-width: 600px;
			margin: 0 auto;
			line-height: 1.6;
		}

		/* 結果セクション */
		.results-section {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		/* データなし状態 */
		.no-data {
			background: white;
			padding: 3rem;
			border-radius: 16px;
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
			text-align: center;
		}

		.no-data p {
			color: #7f8c8d;
			font-size: 1.2rem;
			font-style: italic;
		}

		/* レスポンシブデザイン */
		@media (max-width: 768px) {
			.wind-calculator {
				padding: 1rem;
			}

			.header h1 {
				font-size: 2rem;
			}

			.input-section {
				padding: 1.5rem;
				grid-template-columns: 1fr;
			}
		}

		@media (max-width: 480px) {
			.header h1 {
				font-size: 1.8rem;
			}

			.header p {
				font-size: 1rem;
			}

			.input-section {
				padding: 1rem;
			}
		}
	`,
})
export class App {
	protected readonly title = signal("100m風速調整計算機");

	// 入力値
	actualTime = signal<number>(10.0);
	windSpeed = signal<number>(0.0);

	// 計算結果
	adjustedTime = computed(() => {
		return this.getCurrentAdjustedTime();
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
				advantage: Math.round(advantage * 1000) / 1000,
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

		const factor = 1.028 - 0.028 * dens * (1.0 - (w * tw) / sp) ** 2;
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
