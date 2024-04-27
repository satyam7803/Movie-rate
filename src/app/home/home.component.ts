import { Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatureModule } from '../feature/feature.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, 
  CommonModule, NgbModule, NgbRatingModule, FeatureModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  trendingMovies: any;
  theatreMovies: any;
  popularMovies: any;

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTheatreMovies();
    this.getPopularMovies();
  }

  getTrendingMovies() {
    this.http.get('http://localhost:4200/assets/data/trending-movies.json').subscribe((movies) => {
      this.trendingMovies = movies;
      // console.log(this.trendingMovies);
    });
  }

  getTheatreMovies() {
    this.http.get('http://localhost:4200/assets/data/theatre-movies.json').subscribe((movies) => {
      this.theatreMovies = movies;
      // console.log(this.trendingMovies);
    });
  }

  getPopularMovies() {
    this.http.get('http://localhost:4200/assets/data/trending-movies.json').subscribe((movies) => {
      this.popularMovies = movies;
      console.log(this.popularMovies);
    });
  }

  goToMovie(type: string, id: string) {
    this.router.navigate(['movie', type, id]);
  }


}
