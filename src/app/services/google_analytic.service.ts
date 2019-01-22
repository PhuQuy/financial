import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class GoogleAnalyticService {
    private BASE_URL = 'https://www.googleapis.com/oauth2/v4/token';
    private ANALYTIC_URL = 'https://content.googleapis.com/analytics/v3/data/ga?start-date=30daysAgo&end-date=2019-01-08&_src=embed-api%3Av1&ids=ga%3A187442357&metrics=ga%3Asessions&dimensions=ga%3Acity&output=dataTable';
    constructor(private http: HttpClient) {

    }

    getAuthorizationCode() {
        return this.http.post(this.BASE_URL, {
            grant_type: 'refresh_token',
            client_id: '465220428307-nlf04be993qfm32vgjdtjgut3mvp8lgm.apps.googleusercontent.com',
            client_secret: '3ZPwhHtaZTV2OiXvNXdDr7JS',
            refresh_token: '1/2r1wFEDrM6dbL6l6CxtN7XuzZ5spK06rsLKFIpKf4MvY361WaAlBMyk2K-JVHLvN'
        }).pipe(
            map((res) => res),
            catchError(error => of('Bad Request'))
        );
    }

    getAnalytics(token) {
        return this.http.get(this.ANALYTIC_URL, { headers: new HttpHeaders().set('authorization', `Bearer ${token}`) }).pipe(
            map(res => res),
            catchError(error => of('Bad Request'))
        )
    }

}
