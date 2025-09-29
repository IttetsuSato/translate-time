import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "time-and-wind-form",
	template: `
  <form>
  <div class="input-section">
    <div class="input-group">
      <label for="actualTime">実際のタイム (秒)</label>
      <input
        name="actualTime"
        id="actualTime"
        type="number"
        step="0.01"
        min="0"
        [ngModel]="actualTime"
        (ngModelChange)="onActualTimeChange($event)"
        placeholder="例: 10.50"
      />
    </div>
    
    <div class="input-group">
      <label for="windSpeed">風速 (m/s)</label>
      <input
        name="windSpeed"
        id="windSpeed"
        type="number"
        step="0.1"
        [ngModel]="windSpeed"
        (ngModelChange)="onWindSpeedChange($event)"
        placeholder="例: 1.5"
      />
      <small>正の値: 向かい風、負の値: 追い風</small>
    </div>
  </div>
  </form>
  `,
	styles: `
    /* 入力セクション */
    .input-section {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
    }

    .input-group label {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .input-group input {
      padding: 1rem;
      border: 2px solid #e1e8ed;
      border-radius: 8px;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      background: #fafbfc;
    }

    .input-group input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
      background: white;
    }

    .input-group small {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
  `,
	imports: [FormsModule],
})
export class TimeAndWindForm {
	@Input() actualTime: number = 0;
	@Input() windSpeed: number = 0;
	@Output() actualTimeChange = new EventEmitter<number>();
	@Output() windSpeedChange = new EventEmitter<number>();

	onActualTimeChange(value: number) {
		this.actualTimeChange.emit(value);
	}

	onWindSpeedChange(value: number) {
		this.windSpeedChange.emit(value);
	}
}
