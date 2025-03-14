export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="footer">
        <div className="container">
          <p className="footer__text">&copy; {currentYear} GameGuides. All rights reserved.</p>
        </div>
      </footer>
    );
  }