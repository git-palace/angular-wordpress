This library is designed to make it easy for your Angular application to request specific resources from a WordPress install.

- **WordPress Rest API** `WordPressModule.forRoot(WordPressDomain)`

- **WordPress RX Service**

   - Get post `wpService.collection().posts().get(postQueryArgs).subscribe(res => posts = res.data)`
   - Add new post `wpService.collection().posts().add(newPost).subscribe(res => newPost = res.data )`
   - Get post by Id `wpService.model().posts().get(postId).subscribe(res => post = res.data)`
   - Update page `wpService.model().pages().add(pageId, page).subscribe(res => page = res.data )`
   - Delete post `wpService.model().posts().delete(postId).subscribe(res => res)`

- **Wordpress Directives**

```html
<!--   Get collection of posts   -->
 
<ul [wpCollection]="'posts'" [wpArgs]="postQueryArgs" (wpResponse)="posts = $event">
  <li *ngFor="let post of res.data"> {{ post.title.rendered }} </li>
</ul>
    
<!--   Get post by ID   -->

<div [wpModel]="'pages'" [wpId]="123" [wpResponse]="res = $event"> {{res?.data.title.rendered}} </div>
```
- **Authentication**

  - Basic authentication `wpService.auth().basic(username, password, remember?)`   
  - Cookies authentication `wpService.auth().cookies()`
  
- **Helper functions to access data in post responses**
- **Photon CDN**
 
- **Blog assests**:

  - Progress bar for requests 
  - Sharebuttons for posts 
  - Disqus for comments 
  - Modal (lightbox) for post images 
___

## Author

 **[Git Palace]**

 - [github/git-palace](https://github.com/git-palace)



