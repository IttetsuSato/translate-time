import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

interface WindTimeResult {
	windSpeed: number;
	adjustedTime: number;
	advantage: number;
}

@Component({
	selector: "wind-time-table",
	template: `
    <div class="wind-table-section">
      <h2>風速別タイム表 (-2.0m/s ～ +2.0m/s)</h2>
      <div class="table-container">
        <table class="wind-table">
          <thead>
            <tr>
              <th>風速 (m/s)</th>
              <th>調整後タイム (秒)</th>
              <th>有利・不利 (秒)</th>
            </tr>
          </thead>
          <tbody>
            @for (result of windTimeTable; track result.windSpeed) {
              <tr [class.current-wind]="result.windSpeed === currentWindSpeed">
                <td class="wind-speed">{{ result.windSpeed }}</td>
                <td class="adjusted-time">{{ result.adjustedTime }}</td>
                <td class="advantage" 
                    [class.positive]="result.advantage > 0" 
                    [class.negative]="result.advantage < 0">
                  {{ result.advantage > 0 ? '+' : '' }}{{ result.advantage }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
	styles: `
    /* 風速別タイム表 */
    .wind-table-section {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .wind-table-section h2 {
      color: #2c3e50;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .table-container {
      overflow-x: auto;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }

    .wind-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 12px;
      overflow: hidden;
    }

    .wind-table th {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      font-weight: 600;
      text-align: center;
      font-size: 0.95rem;
    }

    .wind-table td {
      padding: 0.8rem;
      text-align: center;
      border-bottom: 1px solid #f1f3f4;
      font-size: 0.95rem;
    }

    .wind-table tbody tr:hover {
      background: #f8f9fa;
    }

    .wind-table tbody tr.current-wind {
      background: linear-gradient(
        135deg,
        rgba(52, 152, 219, 0.1) 0%,
        rgba(155, 89, 182, 0.1) 100%
      );
      border-left: 4px solid #3498db;
    }

    .wind-speed {
      font-weight: 600;
      color: #2c3e50;
    }

    .adjusted-time {
      font-weight: 600;
      color: #27ae60;
    }

    .advantage.positive {
      color: #e74c3c;
      font-weight: 600;
    }

    .advantage.negative {
      color: #27ae60;
      font-weight: 600;
    }

    /* レスポンシブデザイン */
    @media (max-width: 768px) {
      .wind-table {
        font-size: 0.85rem;
      }

      .wind-table th,
      .wind-table td {
        padding: 0.6rem 0.4rem;
      }
    }

    @media (max-width: 480px) {
      .wind-table-section {
        padding: 1.5rem;
      }
    }
  `,
	imports: [CommonModule],
})
export class WindTimeTable {
	@Input() windTimeTable: WindTimeResult[] = [];
	@Input() currentWindSpeed: number = 0;
}
