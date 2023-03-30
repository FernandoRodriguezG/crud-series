import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { Serie } from '../serie';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-index-serie',
  templateUrl: './index-serie.component.html',
  styleUrls: ['./index-serie.component.css']
})
export class IndexSerieComponent implements OnInit {

  displayedColumns: string[] = ['name', 'plataforma', 'year','calificacion','actions'];
  dataSource!: MatTableDataSource<Serie>;
  series:any;

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort) sort: any =  MatSort;

  alert:boolean =false;
  textAlert:string = '';

   constructor(private router: Router, private _ServerService: ServerService, public dialog: MatDialog) {

    
  }

  ngAfterViewInit() {

    this._ServerService.getServer('/series').then(
      (data:any) => {
        console.log(data);
        this.series = data;
        this.dataSource = new MatTableDataSource<Serie>(this.series);
        this.paginator._intl.itemsPerPageLabel = 'Series por página';
        this.paginator._intl.getRangeLabel = this.getRangeLabel;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error: any) => {
        console.log(error);
      }
      );
      
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRangeLabel = (page: number, pageSize: number, length: number): any => {
    if (length === 0 || pageSize === 0) {
        return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
};

  ngOnInit(): void {
  }

  agregarSerie(): void{
    this.router.navigateByUrl('/series/serie');
  }

  editSerie(id:number): void{
    this.router.navigateByUrl('/series/serie/'+id);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,id:string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '350px',
      panelClass: 'custom-modalbox',
    }).afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this._ServerService.deleteServer(id).then(
          (data:any) => {
            console.log(data);
            this._ServerService.getServer('/series').then(
              (data:any) => {
                console.log(data);
                this.series = data;
                this.dataSource = new MatTableDataSource<Serie>(this.series);
                this.paginator._intl.itemsPerPageLabel = 'Series por página';
                this.paginator._intl.getRangeLabel = this.getRangeLabel;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }, (error: any) => {
                console.log(error);
              }
              );

              this.alert = true;
              this.textAlert = "Serie eliminada correctamente";
              setTimeout(async () => {
                  this.alert = false;
              }, 8000);
          }, (error:any) => {
            console.log(error);
          }
        )
      } 
    });
  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}

  onConfirm(): void {
    // Close the dialog, return true
    console.log('Se elimino la serie');
    
    this.dialogRef.close(true);

  }

}

