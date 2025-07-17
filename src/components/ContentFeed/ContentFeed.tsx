'use client'

import { useState } from 'react'
import ContentCard from '@/components/ContentCard/ContentCard'
import Pager from '@/components/Pager/Pager'
import TagFilter from '@/components/TagFilter/TagFilter'
import styles from './ContentFeed.module.css'

const sampleData = [
  {
    id: 1,
    image: 'https://picsum.photos/400/250?random=101',
    date: '2025-07-10',
    title: 'Sample Post One',
    description: 'Guide on vehicle undercarriage maintenance.',
    primaryAction: 'Read More',
    secondaryAction: 'Share',
    tags: ['Maintenance', 'DIY'],
  },
  {
    id: 2,
    image: 'https://picsum.photos/400/250?random=102',
    date: '2025-07-11',
    title: 'Sample Post Two',
    description: 'Car detailing tips and tricks.',
    primaryAction: 'Read More',
    secondaryAction: 'Share',
    tags: ['Detailing', 'Care'],
  },
  {
    id: 3,
    image: 'https://picsum.photos/400/250?random=103',
    date: '2025-07-12',
    title: 'Sample Post Three',
    description: 'Essential engine maintenance routines.',
    primaryAction: 'Read More',
    secondaryAction: 'Share',
    tags: ['Maintenance', 'Engine'],
  },
]

// Unique tag list
const uniqueTags = ['All', ...new Set(sampleData.flatMap(item => item.tags))]

export default function ContentFeed() {
  const [selectedTag, setSelectedTag] = useState('All')

  const filteredData =
    selectedTag === 'All'
      ? sampleData
      : sampleData.filter(item => item.tags.includes(selectedTag))

  return (
    <section className={styles.contentFeed}>
      <TagFilter
        tags={uniqueTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
      />

      {filteredData.map(item => (
        <ContentCard
          key={item.id}
          image={item.image}
          date={item.date}
          title={item.title}
          description={item.description}
          primaryAction={item.primaryAction}
          secondaryAction={item.secondaryAction}
        />
      ))}

      <Pager />
    </section>
  )
}
