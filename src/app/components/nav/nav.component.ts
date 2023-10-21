import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public Brand: string = ''; 

  @Input() public Maserati: number = 0;
  @Input() public Ferrari: number = 0;
  @Input() public Buggatti: number = 0;
  @Input() public Lamborghini: number = 0;
  @Input() public All: number = 0;

  @Output() public FilterClicked:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  public FilterButtonClicked(e: any): void{
    this.Brand = e.target.name;
    this.FilterClicked.emit(this.Brand);
  }

}
