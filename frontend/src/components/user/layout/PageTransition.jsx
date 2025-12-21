// src/components/user/layout/PageTransition.jsx
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Trạng thái ban đầu: mờ và thấp hơn 20px
      animate={{ opacity: 1, y: 0 }}  // Trạng thái hiển thị: rõ và về vị trí gốc
      exit={{ opacity: 0, y: -20 }}   // Trạng thái biến mất: mờ và trượt lên trên
      transition={{ duration: 0.3, ease: "easeInOut" }} // Thời gian diễn ra 0.3s
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;