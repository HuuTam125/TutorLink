
import ContactInfo from '../../components/user/contact/ContactInfo';
import ContactForm from '../../components/user/contact/ContactForm';

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">

      {/* 1. HEADER SECTION (Minimalist) */}
      <div className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">Liên hệ</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Kết nối với chúng tôi</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
            Chúng tôi tin rằng mọi thắc mắc đều xứng đáng được giải đáp tận tình. <br className="hidden md:block" />
            Hãy để lại tin nhắn, chúng tôi sẽ hỗ trợ bạn ngay lập tức.
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Cột trái: Thông tin (Chiếm 5 phần) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ContactInfo />
          </div>

          {/* Cột phải: Form (Chiếm 7 phần) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ContactForm />
          </div>

        </div>
      </div>

      {/* 3. SIMPLE MAP SECTION (Optional) */}
      <div className="w-full h-96 bg-slate-100 relative grayscale-[80%]">
        {/* Placeholder cho Google Maps Iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.519143301738!2d106.80344101529016!3d10.869865892597835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527820628d8e9%3A0x8fa8c0addc5afa3a!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Map"
          className="absolute inset-0"
        ></iframe>
      </div>

    </div>
  );
};

export default ContactPage;