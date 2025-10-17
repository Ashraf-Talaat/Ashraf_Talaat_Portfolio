# Professional Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript featuring dark/light mode toggle, smooth animations, and professional design.

## ✨ Features

- **🎨 Dark/Light Mode Toggle** - Seamlessly switch between themes with smooth transitions
- **🚀 Smooth Animations** - Scroll-triggered animations and hover effects
- **📱 Fully Responsive** - Optimized for all device sizes
- **♿ Accessibility** - Keyboard navigation and ARIA labels
- **🎯 Interactive Elements** - Hover effects, form handling, and smooth scrolling
- **🌙 Theme Persistence** - Remembers user's theme preference
- **📧 Contact Form** - Functional contact form with validation
- **🔝 Scroll to Top** - Smooth scroll to top functionality

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript
- A code editor (VS Code, Sublime Text, etc.)

### Installation
1. Download or clone the repository
2. Open the project folder in your code editor
3. Open `index.html` in your web browser

### File Structure
```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and themes
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization

### Personal Information
Edit the following sections in `index.html`:

- **Header Section**: Update name, title, and description
- **Profile Image**: Replace the placeholder image URL with your own
- **Projects**: Modify project details, descriptions, and technologies
- **About Me**: Update your background, skills, and experience
- **Contact Information**: Update email, phone, and location
- **Social Links**: Add your actual social media profiles

### Colors and Themes
Modify the CSS variables in `styles.css`:

```css
:root {
    /* Light Mode Colors */
    --bg-primary-light: #ffffff;
    --accent-primary-light: #8b5cf6;
    
    /* Dark Mode Colors */
    --bg-primary-dark: #0f172a;
    --accent-primary-dark: #a855f7;
}
```

### Adding New Sections
To add new sections:

1. Add HTML structure in `index.html`
2. Style the section in `styles.css`
3. Add animations using `data-aos` attributes
4. Include any JavaScript functionality in `script.js`

## 🎭 Animations

### Scroll Animations
Use these data attributes for scroll animations:

```html
<div data-aos="fade-up">Fades up when scrolled into view</div>
<div data-aos="fade-left">Fades from left</div>
<div data-aos="fade-right">Fades from right</div>
<div data-aos="zoom-in">Zooms in</div>
```

### Hover Effects
The CSS includes various hover effects:
- Button hover animations
- Card lift effects
- Social link transformations
- Skill item rotations

## 🌙 Theme System

### How It Works
The theme system uses CSS custom properties and JavaScript to:
1. Store theme preference in localStorage
2. Apply appropriate CSS variables
3. Smoothly transition between themes
4. Remember user's choice across sessions

### Adding New Themes
To add a new theme:

1. Add CSS variables in `styles.css`
2. Create a new theme class
3. Update the JavaScript toggle function
4. Add theme-specific styles

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

### Mobile Optimizations
- Touch-friendly button sizes
- Optimized typography scaling
- Simplified layouts for small screens
- Improved navigation for mobile devices

## 🚀 Performance Features

### Optimizations
- Debounced scroll events
- Throttled animations
- Efficient DOM queries
- Smooth scrolling with requestAnimationFrame
- Lazy loading ready

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for older browsers
- Progressive enhancement approach

## 🔧 JavaScript Features

### Core Functionality
- **Theme Management**: Toggle and persist themes
- **Scroll Animations**: Intersection Observer API
- **Smooth Scrolling**: Custom easing functions
- **Form Handling**: Validation and submission
- **Interactive Elements**: Hover effects and animations

### Extending Functionality
The JavaScript is organized in a class structure for easy extension:

```javascript
class PortfolioWebsite {
    constructor() {
        this.init();
    }
    
    // Add new methods here
    setupNewFeature() {
        // Your custom functionality
    }
}
```

## 📧 Contact Form

### Current Implementation
- Form validation
- Success notifications
- Loading states
- Form reset after submission

### Backend Integration
To connect to a real backend:

1. Replace the form submission handler in `script.js`
2. Add your API endpoint
3. Handle server responses
4. Add error handling

Example:
```javascript
async handleFormSubmission(form) {
    const formData = new FormData(form);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            this.showNotification('Message sent!', 'success');
        } else {
            this.showNotification('Error sending message', 'error');
        }
    } catch (error) {
        this.showNotification('Network error', 'error');
    }
}
```

## 🎨 Design System

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400)
- **Line Heights**: Optimized for readability

### Spacing
- **Container**: Max-width 1200px
- **Section Padding**: 6rem top/bottom
- **Element Margins**: Consistent spacing scale
- **Grid Gaps**: 2rem for cards, 4rem for sections

### Shadows and Borders
- **Cards**: Subtle borders with hover effects
- **Buttons**: Gradient backgrounds with shadows
- **Modals**: Layered shadows for depth

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a repository
- **AWS S3**: Upload files to S3 bucket

### Custom Domain
1. Purchase a domain
2. Configure DNS settings
3. Update hosting provider settings
4. Add SSL certificate

## 🔒 Security Considerations

### Form Security
- Implement CSRF protection
- Add rate limiting
- Validate input server-side
- Use HTTPS in production

### Content Security Policy
Add CSP headers for production:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com;
               style-src 'self' 'unsafe-inline' fonts.googleapis.com cdnjs.cloudflare.com;
               font-src fonts.gstatic.com;">
```

## 🧪 Testing

### Browser Testing
Test in multiple browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Device Testing
Test on various devices:
- Desktop (various screen sizes)
- Tablet (portrait and landscape)
- Mobile (portrait and landscape)

### Performance Testing
- Use Lighthouse for performance scores
- Test loading times
- Check accessibility scores
- Validate mobile responsiveness

## 📚 Learning Resources

### CSS
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

### JavaScript
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS Custom Properties in JS](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)
- [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 🤝 Contributing

Feel free to contribute improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for placeholder images
- Modern CSS and JavaScript community

## 📞 Support

If you need help or have questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments
- Test in different environments

---

**Happy coding! 🚀**

This portfolio template is designed to showcase your skills while providing a great user experience. Customize it to match your personality and professional brand.
