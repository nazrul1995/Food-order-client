import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Container from '../Container';
import Logo from '../Logo';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Browse Chefs", href: "#" },
    { label: "Explore Menus", href: "#" },
    { label: "Active Deals", href: "#" },
    { label: "Success Stories", href: "#" }
  ];

  const supportLinks = [
    { label: "Help Center", href: "#" },
    { label: "Safety Standards", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" }
  ];

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-8 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute w-[400px] h-[400px] bg-lime-500/5 blur-[120px] rounded-full bottom-[-150px] right-[-100px] pointer-events-none" />

      <Container>
        {/* Main Links Grid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-slate-900 relative z-10">
          
          {/* Brand Presentation & Social Handles */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Logo/>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Connecting independent culinary artisans directly with neighborhood food lovers. Fresh, customized, and delivered hot.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: <Facebook size={18} />, url: "https://facebook.com" },
                { icon: <Twitter size={18} />, url: "https://twitter.com" },
                { icon: <Instagram size={18} />, url: "https://instagram.com" },
                { icon: <Linkedin size={18} />, url: "https://linkedin.com" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-lime-400 hover:border-lime-500/30 hover:bg-slate-900/80 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Platform Exploration Links */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">Explore</h4>
            <ul className="space-y-3 text-sm font-medium">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors duration-200 block py-0.5">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours & Service Availability */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">Kitchen Windows</h4>
            <ul className="space-y-3.5 text-slate-400 text-sm font-medium">
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-lime-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-200">Mon - Fri: 9:00 AM - 10:00 PM</p>
                  <p className="text-slate-500 text-xs mt-0.5">Dinner windows extend late</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-200">Sat - Sun: 10:00 AM - 11:00 PM</p>
                  <p className="text-slate-500 text-xs mt-0.5">Weekend brunch operations</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Physical Office Contact Details */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">Contact HQ</h4>
            <ul className="space-y-3.5 text-slate-400 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">123 Main St, Banani, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-sky-400 flex-shrink-0" />
                <span>+880 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-pink-400 flex-shrink-0" />
                <span>support@localchefbazar.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Flat Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 relative z-10">
          <p>© {currentYear} LocalChefBazar. All rights reserved.</p>
          <div className="flex gap-6">
            {supportLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:text-slate-300 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;