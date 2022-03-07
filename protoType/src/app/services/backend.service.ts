import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Message, SVGObject, Thought } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getValidMessages(walletAddress: string): Promise<Thought[]> {
    return lastValueFrom(
      this.http.get<Thought[]>(`/user?walletAddress=${walletAddress}`)
    );
  }

  sendMessage(message: Message, walletAddress: string): Promise<Thought[]> {
    return lastValueFrom(
      this.http.post<Thought[]>(`/user/${walletAddress}/`, message)
    );
  }

  getSvg(thought: Thought, walletAddress: string): Promise<SVGObject> {
    return lastValueFrom(
      this.http.post<SVGObject>(`/user/${walletAddress}/mint`, thought)
    );
  }

  deleteMessages(walletAddress: string): Promise<String> {
    return lastValueFrom(this.http.delete<String>(`/user/${walletAddress}`));
  }
}
