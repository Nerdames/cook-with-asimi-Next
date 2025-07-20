'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Recomended, Newsletter, RelatedTopics } from '@/LayoutModules';

interface LayoutSidebarProps {
  modules?: Array<'recomended' | 'newsletter' | 'related'>;
}

export default function LayoutSidebar({ modules = [] }: LayoutSidebarProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modules.join('-')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.4 }}
      >
        {modules.includes('recomended') && <Recomended />}
        {modules.includes('newsletter') && <Newsletter />}
        {modules.includes('related') && <RelatedTopics />}
      </motion.div>
    </AnimatePresence>
  );
}
