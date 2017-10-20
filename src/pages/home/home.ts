import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddReviewPage } from '../add-review/add-review';
import { ReviewsProvider } from '../../providers/reviews/reviews';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  reviews:any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public reviewService: ReviewsProvider) {
  }

  ionViewDidLoad(){
    this.reviewService.getReviews().then((data)=>{
      console.log(data);
      this.reviews = data;
    });
  }

  addReview(){
    let modal = this.modalCtrl.create(AddReviewPage);
    modal.onDidDismiss(review=>{
      if(review){
        this.reviews.push(review);
        this.reviewService.createReviews(review);
      }
    });
    modal.present();
  }

  deleteReview(review){
    let index = this.reviews.indexOf(review);
    if(index>-1){
      this.reviews.splice(index, 1);
    }
    this.reviewService.deleteReview(review._id);
  }
}
