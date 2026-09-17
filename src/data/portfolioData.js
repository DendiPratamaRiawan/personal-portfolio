import simagangImg from '../assets/simagang.jpg';
import GotokoImg from '../assets/Gotoko.jpg';
import kipKUImg from '../assets/KipKu.jpg';
import BLKImg from '../assets/BLKcertif.png';
import cyberImg from '../assets/cyber.png';


export const portfolioData = {
  name: "Dendi Pratama Riawan",
  role: "Network Engineer",
  roles: [
    "Network Engineer", 
    "IT Support Specialist", 
    "Junior Cyber Security"
  ],
  about: "Undergraduate Informatics student at Universitas Faletehan, demonstrating strong integrity, responsibility, and a high commitment to continuous learning. Highly interested in IT Support and Network Engineering, with hands-on experience in troubleshooting computer hardware and software, as well as basic network configuration and maintenance. Actively developing technical skills through training and certifications. Passionate about working with hardware systems, software environments, and computer networks. Equipped with strong communication skills, the ability to work effectively in a team, and a readiness to take on challenges in the IT industry.",

  skills: [
    "Network Configuration", 
    "Network Topology Design",
    "Hardware & Software Troubleshooting", 
    "Active Directory",
    "Sophos Firewall Configuration", 
    "CCTV Installation", 
    "Microsoft 365",
    "Python & Flask", 
    "React Native & Expo", 
    "Tailwind CSS",
    "IoT", 
    "Supabase", 
    "Firebase", 
    "Raspberry Pi", 
    "Bug Tracking", 
    "Penetration Testing", 
    "Wazuh", 
    "Log Analysis & SIEM",
    "AWS (Amazon Web Services)"
  ],

  experiences: [
    { 
      title: "IT Support Specialist", 
      company: "PT Pelindo (PERSERO) Regional 2 Banten", 
      date: "July 2026" 
    },
    { 
      title: "IT Support Specialist", 
      company: "PT Indorama Petrochemicals", 
      date: "April 2026" 
    }
  ],

  education: [
    { 
      degree: "B.S. in Informatics Engineering (GPA: 3.82 / 4.00)", 
      institution: "Universitas Faletehan", 
      date: "2023 - Present" 
    },
    { 
      degree: "Social Sciences Major", 
      institution: "SMA Negeri 2 Rangkasbitung", 
      date: "2020 - 2023" 
    }
  ],

  organizations: [
    { 
      role: "Head of Information & Communication Division", 
      organization: "Himpunan Program Studi Informatika", 
      date: "2025 - 2026" 
    },
    { 
      role: "Head of Information & Communication Division", 
      organization: "UKM Kerohanian Islam", 
      date: "2023 - 2025" 
    }
  ],

  volunteers: [
    { 
      role: "Head of Volunteer", 
      organization: "Faletehan Menyapa Desa, Student Executive Board", 
      date: "2026" 
    },
    { 
      role: "Public Relations Volunteer", 
      organization: "Faletehan Expo Competition 2025", 
      date: "2025" 
    }
  ],

  certificates: [
    { 
      title: "Cyber Security Red Team & Blue Team", 
      issuer: "Akademi Surosowan Cyber", 
      date: "2026", 
      img: cyberImg,
      link: "https://drive.google.com/file/d/15MiK7V3Y48r2Z2_KYQiCjZr8F3YH4Six/view?usp=sharing"
    },
    { 
      title: "Cloud Computing Support", 
      issuer: "BBVP Serang", 
      date: "2024", 
      img: BLKImg,
      link: "https://drive.google.com/file/d/10F_iLVY9iabFxBZ0e7UjdGJqP4ctCKw8/view?usp=sharing"
    }
  ],

  awards: [
  ],

  projects: [
    { 
      title: "SIMAGANG APP", 
      desc: "Aplikasi presensi berbasis geofencing yang memanfaatkan GPS dan realtime database untuk memastikan presensi dilakukan di lokasi yang ditentukan, dengan konfigurasi lokasi yang dapat disesuaikan secara instan.", 
      tech: ["React Native Expo SDK 54", "Firebase", "MobileFaceNet TFLite", "OpenStreetMap"],
      date: "2026",
      img: simagangImg,
      github: "#" 
    },
        { 
      title: "FinMahasiswa APP", 
      desc: "FinMahasiswa adalah aplikasi manajemen keuangan personal yang dirancang khusus untuk memenuhi kebutuhan mahasiswa, khususnya penerima beasiswa KIP-Kuliah. Aplikasi ini membantu pengguna mengelola uang saku, pencairan beasiswa, serta pengeluaran bulanan secara terstruktur melalui antarmuka yang intuitif dan mudah digunakan.", 
      tech: ["React Native Expo SDK 54", "Firebase"],
      date: "2026",
      img: kipKUImg,
      github: "https://github.com/rosi1598201-cpu/KipKu-PPM2.git" 
    },
            { 
      title: "GoToko.id APP", 
      desc: "GoToko.id adalah aplikasi e-commerce berbasis mobile yang dirancang untuk memberikan pengalaman belanja online yang ringkas dan intuitif. Aplikasi ini dilengkapi dengan alur otentikasi pengguna, eksplorasi katalog produk berdasarkan kategori (Fashion, Elektronik, Aksesoris), penelusuran produk unggulan, serta manajemen keranjang belanja (cart) secara real-time melalui navigasi bawah yang responsif.", 
      tech: ["React Native Expo SDK 54", "Firebase"],
      date: "2025",
      img: GotokoImg,
      github: "#" 
    }
  ],

  services: [
    { 
      title: "Network Support & Security", 
      level: "Intermediate", 
      desc: "Configuration, troubleshooting, and maintenance of LAN/WAN, MikroTik, Cisco, and Sophos Firewalls." 
    },
    { 
      title: "IT Support & Infrastructure", 
      level: "Intermediate", 
      desc: "Software installation, hardware maintenance, user support, CCTV, and NVR management." 
    },
    { 
      title: "Web & Mobile Development", 
      level: "Intermediate", 
      desc: "Responsive web & mobile apps using React, React Native Expo, Tailwind CSS, Python Flask, and Supabase." 
    },
    { 
      title: "Database Management", 
      level: "Intermediate", 
      desc: "Relational database design, CRUD operations, and cloud database administration using MySQL and Supabase." 
    },
    { 
      title: "Cybersecurity (Blue Team)", 
      level: "Basic", 
      desc: "Network monitoring, log analysis, vulnerability management, and threat detection." 
    }
  ]
};