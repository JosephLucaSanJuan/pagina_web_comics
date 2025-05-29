import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComicProfilePage } from './comic-profile.page';

describe('ComicProfilePage', () => {
  let component: ComicProfilePage;
  let fixture: ComponentFixture<ComicProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
