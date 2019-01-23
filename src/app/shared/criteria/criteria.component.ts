import {
  AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() displayCriteria: boolean;
  @Input() hitCount: number;
  protected hitMessage: string;

  // $$: We use NgModel here because we would like to access the "valueChanges" property on NgModel
  @ViewChild(NgModel) filterElementRef: NgModel;
  // @ViewChild('filterElement') filterElementRef: NgModel;

  // $$: Two ways of retrieving ViewChildren
  // @ViewChildren(NgModel) inputElementRefs: QueryList<ElementRef>;
  @ViewChildren('filterElement, nameElement') inputElementRefs: QueryList<ElementRef>;

  /*
  private _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  // $$: call filter function on value change
  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(this.listFilter);
  }
  */

  constructor() { }

  ngOnInit() {
  }

  // $$: View child is available on ngAfterViewInit
  ngAfterViewInit(): void {
    // this.filterElementRef.nativeElement.focus();
    this.filterElementRef.valueChanges.subscribe(/* perform filter */() => {});

    console.log('@ViewChildren("filterElement, nameElement")', this.inputElementRefs);
  }

  /**
   * $$: Gets called if any @Input() property is changed. It only works with @Input() decorator
   *
   * @param changes: A key-value pairs of changes made to any of the @Input() properties
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called', changes);

    if (changes.hitCount && !changes.hitCount.currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = `Hits: ${this.hitCount}`;
    }
  }

}
