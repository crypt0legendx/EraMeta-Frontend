import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackService } from './snack.service';

@Injectable({
  providedIn: 'root'
})
export class DeploymentService {

  constructor(private http: HttpClient, private snackService: SnackService) { }

  postData(collectionID: string, userID: string) {
    this.snackService.showSnackBar("uncomment function");
  //   this.http.post<any[]>("http://34.227.86.191:49999/candy-machine/upload", {
  //     headers: {'Access-Control-Allow-Origin': "http://localhost:4200/"},
  //     params: {'collectionID' : collectionID, 'userID' : userID}
  //  }).subscribe(
  //   response=> {
  //     console.log("POST completed sucessfully. The response received "+response);
  //   },
  //   error => {
  //     console.log("Post failed with the errors: ", error);
  //   },
  //   () => {
  //     console.log("Post Completed");
  //   }
  //  )
  }
}
