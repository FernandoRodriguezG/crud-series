import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { Serie } from './serie';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
    supabaseURL = environment.supabaseURL;
    supabaseKey = environment.supabaseKey;
    supabase = createClient(this.supabaseURL,this.supabaseKey);
    URL_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient,) { }

async  getServer(url: string) {
        
    const { data: seriesList } = await this.supabase
    .from("series")
    .select()
    return seriesList;
}

async  getServerOne(id: any) {
        
    const { data: serie } = await this.supabase
    .from("series")
    .select()
    .eq('id',id);
    return serie;
}

async postServer(url: string, params: Serie) {
    
    const { data, error } = await this.supabase
    .from("series")
    .insert([
    { nombre: params.nombre, plataforma: params.plataforma, calificacion: params.calificacion, year: params.year },
    ]);

    return data;
}

async putServer(id: string, params: any) {
    const { data, error } = await this.supabase
    .from('series')
    .update({ nombre: params.nombre, plataforma: params.plataforma, calificacion: params.calificacion, year: params.year })
    .eq('id',id)
    return data;
}

async deleteServer(id: string) {
    const { data, error } = await this.supabase
    .from('series')
    .delete()
    .eq('id',id);
    return data;

}
}
