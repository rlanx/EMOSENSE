const knowledgeData = [
  {
    id: 1,
    title: "Understanding Depression",
    desc: "An overview of the symptoms, causes, and treatment options for depression.",
    details:
      "Depression is a mental health disorder that affects millions worldwide. It can manifest in different ways, including persistent sadness, loss of interest, and fatigue. Common causes include genetic predisposition, life stressors, and chemical imbalances in the brain. Treatments range from medication and therapy to lifestyle changes. Seeking professional help is essential for managing symptoms and improving quality of life.",
    author: "Dr. Jane Smith",
    date: "2024-12-15",
  },
  {
    id: 2,
    title: "Living with Depression",
    desc: "A personal account of managing daily life while dealing with depression.",
    details:
      "Living with depression can be challenging, but it is possible to maintain a fulfilling life with the right coping mechanisms. Establishing a routine, engaging in physical activities, and seeking social support can help individuals manage symptoms. This article shares the experiences of someone who has learned to navigate depression, highlighting key strategies that have made a positive difference.",
    author: "John Doe",
    date: "2025-01-10",
  },
  {
    id: 3,
    title: "Depression in the Workplace",
    desc: "How employers can support employees struggling with mental health issues.",
    details:
      "Workplace mental health is a growing concern, and employers play a crucial role in supporting employees. Providing mental health resources, promoting open conversations, and creating a supportive environment can help employees manage stress and depression. This article explores practical ways businesses can foster mental well-being in the workplace.",
    author: "Corporate Wellness Team",
    date: "2024-11-20",
  },
  {
    id: 4,
    title: "Recognizing Signs of Depression in Teens",
    desc: "A guide for parents and teachers to identify depression in adolescents.",
    details:
      "Teen depression can be difficult to recognize, as mood swings are common in adolescence. However, persistent sadness, withdrawal from activities, and changes in sleep patterns may indicate deeper issues. This article provides parents and teachers with insights on recognizing symptoms early and how to offer appropriate support.",
    author: "Mental Health Foundation",
    date: "2024-10-05",
  },
  {
    id: 5,
    title: "The Impact of Social Media on Depression",
    desc: "Examining the role of social media in influencing mental health.",
    details:
      "Social media can have both positive and negative effects on mental health. While it allows for connection and self-expression, excessive use can lead to feelings of inadequacy and anxiety. Studies show that excessive social media consumption may contribute to depression, particularly among young users. This article delves into research on the subject and suggests ways to use social media mindfully.",
    author: "Dr. Alan Grey",
    date: "2025-01-18",
  },
  {
    id: 6,
    title: "Diet and Depression",
    desc: "How nutrition and lifestyle changes can help alleviate symptoms of depression.",
    details:
      "A balanced diet can play a crucial role in managing depression. Nutrients such as omega-3 fatty acids, vitamins, and antioxidants help regulate mood and cognitive function. This article discusses how dietary choices impact mental health and offers practical suggestions for a mood-boosting diet.",
    author: "Dr. Emily Clark",
    date: "2024-12-01",
  },
  {
    id: 7,
    title: "Understanding Postpartum Depression",
    desc: "An in-depth look at postpartum depression and available treatments.",
    details:
      "Postpartum depression affects many new mothers and can significantly impact their well-being and ability to care for their baby. Symptoms include mood swings, anxiety, and overwhelming fatigue. This article explores causes, risk factors, and treatment options, including therapy and medication.",
    author: "Dr. Lisa Morgan",
    date: "2025-01-05",
  },
  {
    id: 8,
    title: "Art Therapy for Depression",
    desc: "Exploring the benefits of creative therapies for mental health.",
    details:
      "Art therapy provides a unique way to express emotions and cope with stress. Engaging in creative activities such as painting or sculpting can help individuals process their feelings and improve overall mental well-being. This article discusses various artistic techniques and their psychological benefits.",
    author: "Therapy Insights",
    date: "2024-11-15",
  },
  {
    id: 9,
    title: "Sleep and Mental Health",
    desc: "The relationship between sleep quality and depression symptoms.",
    details:
      "Lack of sleep can worsen depression symptoms and impact daily functioning. This article explains the importance of good sleep hygiene and offers strategies for improving sleep patterns, such as maintaining a consistent bedtime routine and reducing screen time before bed.",
    author: "Dr. Andrew White",
    date: "2024-10-30",
  },
  {
    id: 10,
    title: "Breaking the Stigma Around Depression",
    desc: "How to create a supportive environment for mental health discussions.",
    details:
      "Mental health stigma prevents many individuals from seeking help. Open conversations, education, and advocacy can help change societal perceptions. This article highlights the importance of awareness campaigns and personal stories in breaking the stigma.",
    author: "Mental Wellness Advocates",
    date: "2025-01-12",
  },
  {
    id: 11,
    title: "Exercise as a Treatment for Depression",
    desc: "The role of physical activity in managing mental health.",
    details:
      "Exercise is a powerful tool for combating depression. Regular physical activity releases endorphins, which help elevate mood and reduce stress. This article explores different types of exercises, including aerobic and resistance training, and how they can positively impact mental well-being.",
    author: "Fitness and Mind",
    date: "2024-12-22",
  },
  {
    id: 12,
    title: "Depression and Chronic Illness",
    desc: "Understanding the connection between long-term illnesses and mental health.",
    details:
      "People with chronic illnesses often experience depression due to ongoing pain, limited mobility, or social isolation. This article delves into the psychological effects of chronic conditions and offers strategies for managing mental health alongside physical health challenges.",
    author: "Dr. Hannah Lee",
    date: "2024-11-05",
  },
  {
    id: 13,
    title: "The Role of Family Support in Depression Recovery",
    desc: "How families can assist loved ones in their journey to better mental health.",
    details:
      "Family support is crucial for individuals recovering from depression. Encouraging open communication, providing a non-judgmental space, and assisting with daily responsibilities can all aid in the healing process. This article offers practical advice for families looking to support their loved ones effectively.",
    author: "Support Networks",
    date: "2024-10-20",
  },
  {
    id: 14,
    title: "Meditation and Mindfulness for Depression",
    desc: "Techniques to improve mental well-being through mindfulness.",
    details:
      "Mindfulness and meditation can help individuals cultivate awareness, reduce negative thinking, and promote emotional balance. This article provides guided mindfulness exercises and discusses their benefits for mental health.",
    author: "Mindful Practices",
    date: "2025-01-08",
  },
  {
    id: 15,
    title: "Depression in the Elderly",
    desc: "Identifying and addressing mental health issues in older adults.",
    details:
      "Depression among the elderly is often overlooked or mistaken for normal aging. This article highlights the symptoms of late-life depression, its causes, and effective interventions, including therapy, medication, and social engagement.",
    author: "Senior Care Experts",
    date: "2024-12-10",
  },
  {
    id: 16,
    title: "Cognitive Behavioral Therapy for Depression",
    desc: "An introduction to CBT and how it helps treat depression.",
    details:
      "Cognitive Behavioral Therapy (CBT) is a structured, evidence-based approach to treating depression. It focuses on identifying and changing negative thought patterns. This article explains the core principles of CBT and how individuals can incorporate its techniques into their daily lives.",
    author: "Therapy Works",
    date: "2024-11-25",
  },
  {
    id: 17,
    title: "Impact of Economic Stress on Mental Health",
    desc: "Exploring the link between financial struggles and depression.",
    details:
      "Financial difficulties can lead to increased stress, anxiety, and depression. This article explores how economic stressors impact mental health and provides tips on financial planning and stress management to mitigate these effects.",
    author: "Dr. Kevin Brown",
    date: "2024-10-15",
  },
  {
    id: 18,
    title: "Understanding Seasonal Affective Disorder",
    desc: "How seasonal changes can affect mental health and coping strategies.",
    details:
      "Seasonal Affective Disorder (SAD) is a type of depression that occurs at specific times of the year, often in winter. This article explains the symptoms, causes, and available treatments, including light therapy and lifestyle changes.",
    author: "Mental Health Today",
    date: "2024-12-05",
  },
  {
    id: 19,
    title: "The Role of Technology in Depression Treatment",
    desc: "How apps and online platforms are aiding mental health care.",
    details:
      "Technology is revolutionizing mental health care through mobile apps, teletherapy, and AI-driven mental health support. This article discusses the latest advancements in digital mental health solutions and how they benefit individuals struggling with depression.",
    author: "Tech for Good",
    date: "2025-01-20",
  },
  {
    id: 20,
    title: "Depression and Substance Abuse",
    desc: "Understanding the complex relationship between addiction and mental health.",
    details:
      "Depression and substance abuse often co-occur, creating a cycle of dependency and worsening mental health. This article explores the connection between addiction and depression and outlines treatment options for individuals dealing with both issues.",
    author: "Dr. Sarah Green",
    date: "2024-11-10",
  },
];

export default knowledgeData;
