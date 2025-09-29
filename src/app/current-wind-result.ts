import { Component, Input } from "@angular/core";

@Component({
	selector: "current-wind-result",
	template: `
    <div class="current-result">
      <h2>現在の風速 ({{ windSpeed }}m/s) での結果</h2>
      <div class="result-cards">
        <div class="result-card">
          <div class="result-label">調整後タイム</div>
          <div class="result-value">{{ adjustedTime }}秒</div>
        </div>
        <div class="result-card" 
             [class.advantage]="advantage < 0" 
             [class.disadvantage]="advantage > 0">
          <div class="result-label">有利・不利</div>
          <div class="result-value">{{ advantage > 0 ? '+' : '' }}{{ advantage }}秒</div>
        </div>
      </div>
    </div>
  `,
	styles: `
    /* 現在の結果カード */
    .current-result {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .current-result h2 {
      color: #2c3e50;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .result-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .result-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .result-card:hover {
      transform: translateY(-2px);
    }

    .result-card.advantage {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    }

    .result-card.disadvantage {
      background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
    }

    .result-label {
      font-size: 0.9rem;
      opacity: 0.9;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .result-value {
      font-size: 1.4rem;
      font-weight: 700;
    }

    /* レスポンシブデザイン */
    @media (max-width: 768px) {
      .result-cards {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .current-result {
        padding: 1.5rem;
      }
    }
  `,
})
export class CurrentWindResult {
	@Input() windSpeed: number = 0;
	@Input() adjustedTime: number = 0;
	@Input() advantage: number = 0;
}
