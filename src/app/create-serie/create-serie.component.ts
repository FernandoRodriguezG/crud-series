import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie } from '../serie';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-create-serie',
  templateUrl: './create-serie.component.html',
  styleUrls: ['./create-serie.component.css']
})
export class CreateSerieComponent implements OnInit {
  title:string = 'Agregar nueva serie';
  buttonText:string = 'Guardar nueva serie';

  serie: Serie = {
    id:'',
    nombre:'',
    calificacion:0,
    plataforma:'',
    year:'',
  }

  alert:boolean =false;
  textAlert:string = '';
  disabled: boolean = false;

  constructor(private _router: Router, private _ServerService: ServerService,private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    console.log(id);
    if(id !== null){
      this._ServerService.getServerOne(id).then(
        (data:any) => {
          console.log(data);
          this.title = 'Editar serie';
          this.buttonText = 'Guardar serie';
          this.serie = data[0];
          
        }, (error:any) => {
          console.log(error);
        }
      )
    }
    
    
  }

  enviar(): void{
    this.disabled = true;
    console.log(this.serie);
    const id = this._route.snapshot.paramMap.get('id');
      if(this.serie.nombre !== '' && this.serie.plataforma !== '' && this.serie.year !== '' && this.serie.year.length === 4){
        if(id===null){
          this._ServerService.postServer('/serie/add',this.serie).then(
            (data:any) => {
              this.alert = true;
              this.textAlert = "Serie añadida correctamente";
              setTimeout(async () => {
                  this.alert = false;
              }, 8000);
              setTimeout(() => {
                this._router.navigateByUrl('series');
                }, 2000);
              console.log(data);
              this.title = 'Editar serie';
              this.buttonText = 'Guardar serie';
            }, (error:any) => {
              console.log(error);
              
            }
          );
        }else{
          this._ServerService.putServer(id,this.serie).then(
            (data:any) => {
              console.log(data);
              
              this.alert = true;
              this.textAlert = "Serie actualizada correctamente";
              setTimeout(async () => {
                  this.alert = false;
              }, 800);
              
              setTimeout(() => {
                this._router.navigateByUrl('series');
                }, 2000);
            }, (error:any) => {
              console.log(error);
              
            }
          );
        }

      }else{
        console.log('false');
        
      }
  }

}
