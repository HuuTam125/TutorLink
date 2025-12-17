import HomeHeroSection from '../../components/user/home/HomeHeroSection';
import ValueProposition from '../../components/user/home/ValueProposition';
import TutorsSection from '../../components/user/home/TutorsSection';
import ClassSection from '../../components/user/home/ClassSection'
import HowItWorksSection from '../../components/user/home/HowItWorksSection'
import TestimonialsSection from '../../components/user/home/TestimonialsSection'
import ContactSection from '../../components/user/home/ContactSection'

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">


      <main className="flex-grow">
        {/* 1. Hero & Stats */}
        <HomeHeroSection />

        {/* 2. Tại sao chọn chúng tôi */}
        <ValueProposition />

        {/* 3. Gia sư tiêu biểu */}
        <TutorsSection />

        {/* 4. Lớp mới nhất (Giữ chân gia sư) */}
        <ClassSection />

        {/* 5. Quy trình (Hướng dẫn) */}
        <HowItWorksSection />

        {/* 6. Đánh giá & Call to Action (Chốt đơn) */}
        <TestimonialsSection />

        {/* 7. Liên hệ */}
        <ContactSection />

      </main>
    </div>
  );
};

export default HomePage;