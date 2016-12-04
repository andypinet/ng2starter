import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { SitemapComponent } from './sitemap.component';

// Load the implementations that should be tested

describe('Sitemap', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      SitemapComponent
    ]
  }));

  it('should log ngOnInit', inject([SitemapComponent], (sitemap: SitemapComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    sitemap.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
