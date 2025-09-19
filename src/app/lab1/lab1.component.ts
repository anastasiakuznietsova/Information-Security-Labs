import { Component, inject, signal } from '@angular/core';
import { Lab1Service } from './lab1.service';
import { RandNum, TestGenerator } from '../labs.interfaces';
import { take } from 'rxjs';

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.scss']
})
export class Lab1Component {
  private service = inject(Lab1Service);

  noSequence: RandNum = {
    sequence: '',
    period: 0
  };
  noTest: TestGenerator = {
    probability: 0,
    actualProbability: 0,
    PIestimate: 0,
    PIactual: 0
  };

  randSequence = signal<RandNum>(this.noSequence);
  testResponse = signal<TestGenerator>(this.noTest);
  n?: number;
  isExpanded = false;


  onExpandSequence() {
    if (this.isExpanded) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }

  onSave() {
    if (this.randSequence().sequence) {
      const blob = new Blob([this.randSequence().sequence], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'sequence.txt';
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }


  createSequence() {
    if (this.n) {
      console.log(this.n);
      this.service.loadInfo(this.n).pipe(take(1)).subscribe({
        next: (resData: RandNum) => {
          this.randSequence.set(resData);
          this.n = undefined
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  testGenerator() {
    this.service.testGenerator().pipe(take(1)).subscribe({
      next: (resData: TestGenerator) => {
        this.testResponse.set(resData);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
