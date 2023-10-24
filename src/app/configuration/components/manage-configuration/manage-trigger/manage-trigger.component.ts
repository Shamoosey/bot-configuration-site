import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Trigger } from 'src/app/configuration/models/trigger';

@Component({
  selector: 'app-manage-trigger',
  templateUrl: './manage-trigger.component.html',
  styleUrls: ['./manage-trigger.component.scss']
})
export class ManageTriggerComponent implements OnInit, OnChanges {
  @Input() trigger: Trigger | null;
  @Input() editMode: boolean;

  @Output() onClose = new EventEmitter();
  @Output() onTriggerEdit = new EventEmitter<Trigger>();
  @Output() onTriggerCreate = new EventEmitter<Trigger>();

  triggerForm: FormGroup;

  triggerResponses: string[] = [];
  triggerWords: string[] = [];
  reactEmotes: string[] = [];

  get manageMode() {
    return this.trigger != null;
  }

  constructor(
    private fb: FormBuilder,
  ) { 
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes) {
    if("triggerId" in changes && this.trigger != null){
      this.initializeForm()
    }
  }

  initializeForm() {
    this.triggerForm = this.fb.group({
      "name": new FormControl(this.trigger?.name ?? "", [ Validators.required ]),
      "messageDelete": new FormControl(this.trigger?.messageDelete ?? false, {}),
      "sendRandomResponse": new FormControl(this.trigger?.sendRandomResponse ?? false, {}),
      "ignoreCooldown": new FormControl(this.trigger?.ignoreCooldown ?? false, {})
    })
  }

  onSubmit(){
    this.triggerForm.markAllAsTouched();
    if(this.triggerForm.status != "INVALID" && this.editMode) {
      let submittedTrigger: Trigger = {
        name: this.triggerForm.controls["name"].value,
        messageDelete: this.triggerForm.controls["messageDelete"].value,
        sendRandomResponse: this.triggerForm.controls["sendRandomResponse"].value,
        ignoreCooldown: this.triggerForm.controls["ignoreCooldown"].value,
        reactEmotes: this.reactEmotes,
        triggerWords: this.triggerWords,
        triggerResponses: this.triggerResponses,
      } 

      if(this.manageMode){
        this.onTriggerEdit.emit(submittedTrigger)
      } else {
        this.onTriggerCreate.emit(submittedTrigger)
      }

      this.onClose.emit()
    }
  }

  resetForm(){
    this.trigger = null;
    this.triggerResponses = [];
    this.triggerWords = [];
    this.reactEmotes = [];
    this.triggerForm.reset();
  }

  removeTriggerWord(triggerWord: string){
    const existingTw = this.triggerWords.findIndex(x => x == triggerWord)
    if(existingTw != -1){
      this.triggerWords.splice(existingTw, 1);
    } 
  }

  addTriggerWord(event: MatChipInputEvent){
    const existingTw = this.triggerWords.findIndex(x => x == event.value)
    if(existingTw == -1 && event.value.trim() != ""){
      this.triggerWords.push(event.value.trim())
      event.chipInput!.clear();
    } 
  }

  removeTriggerResponse(triggerResponse: string){
    const existingTw = this.triggerResponses.findIndex(x => x == triggerResponse)
    if(existingTw != -1){
      this.triggerResponses.splice(existingTw, 1);
    } 
  }

  addTriggerResponse(event: MatChipInputEvent){
    const existingTw = this.triggerResponses.findIndex(x => x == event.value)
    if(existingTw == -1 && event.value.trim() != ""){
      this.triggerResponses.push(event.value.trim())
      event.chipInput!.clear();
    } 
  }

  removeReactEmote(reactEmote: string){
    const existingTw = this.reactEmotes.findIndex(x => x == reactEmote)
    if(existingTw != -1){
      this.reactEmotes.splice(existingTw, 1);
    } 
  }

  addReactEmote(event: MatChipInputEvent){
    const existingTw = this.reactEmotes.findIndex(x => x == event.value)
    if(existingTw == -1 && event.value.trim() != ""){
      this.reactEmotes.push(event.value.trim())
      event.chipInput!.clear();
    } 
  }

  onDrawerClose(){
    this.resetForm();
    this.onClose.emit();
  }
}
