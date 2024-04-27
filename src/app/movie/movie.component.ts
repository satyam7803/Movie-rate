import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FeatureModule } from '../feature/feature.module';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [HeaderComponent, FeatureModule, CommonModule, HttpClientModule,FormsModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})

export class MovieComponent implements OnInit {
  type: string = '';
  id: string= '';
  url: string = '';
  movies: any;
  movie: any;
  uname: string = ''; // Assuming you want to capture reviewer's name
  reviewRating: number = 0; // Assuming you want to capture review rating
  review: string = ''; // Assuming you want to capture review text

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type === 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-movies.json';
    }
    if (this.type === 'theatre') {
      this.url = 'http://localhost:4200/assets/data/theatre-movies.json';
    }
    if (this.type === 'popular') {
      this.url = 'http://localhost:4200/assets/data/popular-movies.json';
    }
    this.getMovie();
  }

  getMovie() {
    this.http.get(this.url).subscribe((movies) => {
      this.movies = movies;
      let index = this.movies.findIndex(
        (movie: { id: string }) => movie.id == this.id
      );
      if (index > -1) {
        this.movie = this.movies[index];
      }
    });
  }

  submitReview() {
    // Assuming you want to create a new review object
    const newReview = {
      author: this.uname,
      rating: this.reviewRating,
      text: this.review,
      published_on: new Date() // Assuming you want to capture the current date
    };
    console.log(newReview);
    // Add the new review to the movie's reviews array
    if (!this.movie.reviews) {
      this.movie.reviews = []; // Ensure the reviews array exists
    }
    this.movie.reviews.push(newReview);

    // Clear the review form fields after submission
    this.uname = '';
    this.reviewRating = 0;
    this.review = '';
  }
}
