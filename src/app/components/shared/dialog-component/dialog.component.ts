import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data';
import { DialogResult } from '../models/dialog-result';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onCloseDialog(buttonClicked: "primary" | "secondary"){
    this.dialogRef.close({
      primaryButtonClicked: buttonClicked == "primary",
      secondaryButtonClicked: buttonClicked == "secondary"
    } as DialogResult)
  }
}
