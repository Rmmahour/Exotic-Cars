import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopath',
  templateUrl: './nopath.component.html',
  styleUrls: ['./nopath.component.css']
})
export class NopathComponent implements OnInit {

  path = location.href;
  constructor() { }

  ngOnInit(): void {
  }

}
