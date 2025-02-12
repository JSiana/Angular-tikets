import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, LOCALE_ID, OnChanges, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { NTodo } from '../../models/todo.model';
import { CommonModule, registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
import { InputComponent } from '../../components/input/input.component';
registerLocaleData(es);


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers:[{
    provide: LOCALE_ID, useValue: 'es'
  }],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnChanges {


  constructor(){
    console.log("constructor");
  }

  ngOnChanges(changes: SimpleChanges) : void {
    console.log('ngOnChanges', changes);
    
  }

  @Input({required:true}) todoData!:NTodo.TodoData ;

  @Output() onClickIcon = new EventEmitter<NTodo.TodoData>();

  @ContentChildren(InputComponent , {read: ElementRef}) projectedContent?: QueryList<ElementRef>;

get priority():string{
  switch(this.todoData.priority){
    case NTodo.Priority.LOW:
      return NTodo.PriorityText.LOW;

    case NTodo.Priority.MEDIUM:
      return NTodo.PriorityText.MEDIUM;

      default:
        return NTodo.PriorityText.HIGH; 
  }
    return '';
}

get progress(){
  return this.todoData.progress * 100;
}

get range(){
  if(this.progress >= 0 && this.progress <= NTodo.Range.LOW){
    return NTodo.RangeText.LOW;
  }else if(this.progress > NTodo.Range.LOW && this.progress <= NTodo.Range.MEDIUM){
    return NTodo.RangeText.MEDIUM;
  }
  return NTodo.RangeText.HIGH;
}

selectContent(){
  const elements = this.projectedContent?.map(val => val)
 console.log(elements);
}
}
