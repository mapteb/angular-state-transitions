import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { User } from "../../transitions-helper/models/user";

// registered mock users
const users: User[] = [{ id: 1, username: 'admin', password: 'admin' },
                       { id: 2, username: 'user', password: 'user' },
                       { id: 3, username: 'guest', password: 'guest' }];

export const mockInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next) => {
    const { url, method, body } = request;
    if (url.endsWith('/users/authenticate') && method === 'POST') {
        return authenticate(body as User);
    }
    return next(request);
}

export const authenticate = (body: User): Observable<HttpEvent<unknown>> => {
    const { username, password } = body;
    const user = users.find(x => x.username === username && x.password === password);
    if (!user) {
        // return error('Username or password is incorrect');
        return throwError(() => new HttpResponse({ status: 401, statusText: 'Username or password is incorrect' }));    
    }
    console.log(">> return auth body: ", body);
    return ok(
        new HttpResponse({
            status: 200,
            body: {
                id: user.id,
                username: user.username,
                role: user.username, // setting role same as username for demo purpose  
            }
        }));
}

export const ok = (body?: any): Observable<HttpEvent<unknown>> => {
    return of(new HttpResponse({ status: 200, body }));
}

export const error = (message: string): Observable<HttpEvent<unknown>> => {
    return throwError(() => ({ error: { message } }));
}
