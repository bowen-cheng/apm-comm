import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit {

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
    this.filterElementRef.valueChanges.subscribe(/* perform filter */);

    console.log(this.inputElementRefs);
  }
}
