import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from '../news/shared/news';
@Component({
  selector: 'app-news-form-modal',
  templateUrl: './news-form-modal.component.html',
  styleUrls: ['./news-form-modal.component.css']
})
export class NewsFormModalComponent implements OnInit {
  public news: News;

  constructor(public activeModal: NgbActiveModal) {
    this.news = new News('', '', '', new Date());
   }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
