// Educational resources data
const resourcesData = [
  {
    "id": -3,
    "title": "Time Management Essentials: The Tools You Need to Maximize Your Attention, Energy, and Productivity",
    "type": "eBook",
    "category": "Time management",
    "description": "Must-know concepts and smart strategies for values-based time management—from the new Business Essentials Series. Time management is an essential skill that every professional needs, no matter the industry.",
    "author": "Anna Dearmon Kornick",
    "rating": null,
    "reviews": null,
    "date": "2023-01-01",
    "tags": ["time management", "productivity", "business", "self-help"],
    "url": "https://pgcc.summon.serialssolutions.com/search?s.fvf%5B%5D=ContentType%2CBook+%2F+eBook&s.q=math#!/search?pn=1&ho=t&include.ft.matches=f&fvf=ContentType,Book%20%2F%20eBook,f&l=en&q=time%20management:~:text=Time%20Management%20Essentials%3A%20The%20Tools%20You%20Need%20to%20Maximize%20Your%20Attention%2C%20Energy%2C%20and%20Productivity",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fwww.safaribooksonline.com%2Flibrary%2Fcover%2F9781264988860"
  },  
  {
    "id": -2,
    "title": "How to Study",
    "type": "Book",
    "category": "Study",
    "description": "Part of Ron Fry's How to Study program, this 6th edition offers strategies to improve study habits, productivity, and academic performance.",
    "author": "Ronald W. Fry",
    "rating": null,
    "reviews": null,
    "date": "2005-01-01",
    "tags": ["study skills", "education", "self-help", "learning"],
    "url": "https://pgcc.summon.serialssolutions.com/search?s.fvf%5B%5D=ContentType%2CBook+%2F+eBook&s.q=math#!/search?pn=1&ho=t&include.ft.matches=f&fvf=ContentType,Book%20%2F%20eBook,f&l=en&q=how%20to%20study:~:text=Quick%20Look-,How%20to%20study,-by%20Fry%2C%20Ronald",
    "image": "https://covers-cdn.summon.serialssolutions.com/index.aspx?isbn=9781401889111/sc.gif&client=summon&freeimage=true"
  },
  {
    "id": -1,
    "title": "Wellness Culture: How the Wellness Movement has been used to Empower, Profit and Misinform",
    "type": "eBook",
    "category": "Study",
    "description": "Wellness has become synonymous with yoga, meditation, and other forms of self-care—but this book critically explores how the wellness movement has also been used to empower, profit, and misinform.",
    "author": "Stephanie Alice Baker",
    "rating": null,
    "reviews": null,
    "date": "2022-01-01",
    "tags": ["wellness", "self-care", "sociology", "health", "culture"],
    "url": "https://pgcc.summon.serialssolutions.com/search?s.fvf%5B%5D=ContentType%2CBook+%2F+eBook&s.q=math#!/search?pn=1&ho=t&include.ft.matches=f&fvf=ContentType,Book%20%2F%20eBook,f&l=en&q=Wellness:~:text=Wellness%20Culture%3A%20How,Baker%2C%20Stephanie%20Alice",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97818026%2F9781802624670.jpg"
  }
,  

  {
    "id": 1,
    "title": "Python How-To",
    "type": "eBook",
    "category": "Study",
    "description": "Have you ever asked yourself, “How do I do that in Python?” If so, you’ll love this practical collection of the most important Python tips and techniques.",
    "author": "Yong Cui",
    "rating": null,
    "reviews": null,
    "date": "2023-01-01",
    "tags": ["python", "programming", "reference"],
    "url": "https://pgcc.summon.serialssolutions.com/search?s.fvf%5B%5D=ContentType%2CBook+%2F+eBook&s.q=math#!/search?pn=1&ho=t&include.ft.matches=f&fvf=ContentType,Book%20%2F%20eBook,f&l=en&q=python:~:text=Python%20How%2DTo,important%20Python...",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fwww.safaribooksonline.com%2Flibrary%2Fcover%2F9781617299742"
  },
  {
    "id": 2,
    "title": "Python Data Analyst's Toolkit - Learn Python and Python-Based Libraries with Applications in Data Analysis and Statistics",
    "type": "eBook",
    "category": "Study",
    "description": "Explore the fundamentals of data analysis, and statistics with case studies using Python.",
    "author": "Gayathri Rajagopalan",
    "rating": null,
    "reviews": null,
    "date": "2021-01-01",
    "tags": ["python", "data analysis", "statistics", "libraries"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwhV3NjtMwELagPQAX_kWBXVmcuGQbO3aaoBVo2baAAC0SLRJ7sRw7RlVCWjWhggviNTjzZjwJY8ep2tVKHBPbM5bGHs-P_Q1CET0Kgws6gUnJOY9kaAuamZhJE_Isk5yOTERJbhO803k6H7Pz9_yzv6rjKn_5-MCRrVNZlts0qgN7sLHz4c-hQ21KLPA4aNbhC7m-ivoU9j-4Yv2zs_Hk7TbmYs1rnqTufZcfwDvYp45Al_n04LPgYEFLYJsCGx-RdQHKBxRTU8OZVVTLTV7uG6e1NODl3kDX6gJmXIMy3U-yUn92TW-hfm4fNNxGV_LqDrrZlXHAflffRX9O8PFXuS6ef_hhgQSOh-4Dj2UjcYtZ0vz99bvGs-WyLBbNM-wwWS8dIyt92f_AnpUav-tcc2yjv_hkJ3eOF9Uuw0XtSFlLuAWSvofm08ns9HXgazcEknJwOgOW5gklSipOlYxUAlt9xJSWMgkVNXGYhrFUmYrAPqDGZOA4MaKVikPJU2VIdB_1qmWVP0AYDJyUREbHkQbzxwKgGkZIpk3KYmO0HqAnO1IRm9KlmWuxJ9YBOmyFJVYtioewnUSxenVO3nz8NKMDhDshCkfAX44Vk5enNrk5otDloBWuaBls6EUeeCvztgtl30ciK2r3Yp2BbTlAT7ul4Il0sNFASRBhaQlLTIQP_8PtEbpOre9PaEDpY9Rr1t_yA9RbfVHq0C_8f2KDB6w",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fcontent.knovel.com%2Fcontent%2FThumbs%2Fthumb14845.gif"
  },
  {
    "id": 3,
    "title": "Python for MATLAB Development - Extend MATLAB with 300,000+ Modules from the Python Package Index",
    "type": "eBook",
    "category": "Study",
    "description": "Learn to enhance MATLAB with Python solutions for computational problems in science, engineering, statistics, and more.",
    "author": "Albert Danial",
    "rating": null,
    "reviews": null,
    "date": "2022-01-01",
    "tags": ["python", "MATLAB", "scientific computing", "modules"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwhV3Nb9MwFH-C9gC78DW0AJssTkiQNXYcp0ETaB-tQFCthw0JLpbj2BwS2qrZKuDA386z61TrhMQxsv0S-cXv0-_3AFJ2mMS3ZAJXKsuyVCWuoZkVXNkkK0uVsdymjBqX4B1fFpdn_Nsk-xqu6vjOXyE-cOj6VDbNJo3qwR5c7HzwZ-BRm4ac5ajp8sF7tbwLfYbnH12x_vn52ejTJuaCU1zS2dd3hQW8g33qCHSZzwA-iw4WjsRuKEYNtqPaGoUPCqarFnVWPZuvTIOm88Is0cufb5uprbLo7-7AvbbGb29RrG6nW7OgxcYPoW9cacMjuGNmj-FB19CBhPP9BH4f_VDL-t30lwMUOBr4B4JWLZkcX3w-PiE3bhi9JSMfPu-GXDyXpEnyBjfgNZnMq-vGtMQVrxA0Mcm_CE-VrlGakY8OsHEXvoxHF6cf4tCcIVYoAoo81qjmypJqF5ZKyio1immeKMEts0YVNteFsD5NOxQF1TilGOq8EpqmQqhKpU-hN5vPzB4QNGEKmtpKpBUaOA7i1HJKy8oWXFhbVRG8vLHvctX4RHIrtxgXwcGaHXKxxumQbpKsF1O_EZRGsBvYJNfLORqLaF1GQDqmSU84XIuVo5NTUaDLlrMI9tfMDCtX7Pa7yYbH6ymM_8xlWbe-Vr1AmzSCVx3rA5EOMBopSSodLemIyfzZf972HO4zV4ThbhXSF9C7Wl6bfegtvmt9EH75v5Bs_z0",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fcontent.knovel.com%2Fcontent%2FThumbs%2Fthumb14868.gif"
  },
  {
    "id": 4,
    "title": "How I Manage My Time - 10 Time Management Tips",
    "type": "video",
    "category": "Time Management",
    "description": "In this video, the creator shares 10 practical time management tips to help you organize your tasks and boost productivity.",
    "author": "Ali Abdaal",
    "rating": null,
    "reviews": null,
    "date": "2021-03-15",
    "tags": ["time management", "productivity", "task management", "self-improvement"],
    "url": "https://www.youtube.com/watch?v=iONDebHX9qk",
    "image": "https://i.ytimg.com/vi/iONDebHX9qk/maxresdefault.jpg"
  },
  {
    "id": 5,
    "title": "Changing Rhythms of American Family Life",
    "type": "Book",
    "category": "Wellness",
    "description": "Many policy makers feared these changes would come at the expense of time mothers spend with their children. This book explores how American family life and time allocation have evolved.",
    "author": "Suzanne M. Bianchi, John P. Robinson, Melissa A. Milkie",
    "rating": null,
    "reviews": null,
    "date": "2006-01-01",
    "tags": ["family", "time use", "sociology", "work-life balance"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwdV3NT8IwFH9BvBgvOjUWEXsyeJjp1nWygxcRogcTTcSol6XMFkh0Sxgc-O_txzZB53Fb03Svfa_v8_cAqH9J3F8yIeCcMUY50Q3NZBhwSdh4zJl_JanvCR3gHY6i0W3w_sDeGrCsoADTZCIyt0RQ_LfwoSZgY0_K_ce1r3GARKJrvBcmh1Ikj5kGY5grU7YI6yijgWrcbo0uppgifCKVo4YoFT8KjUWnjAumhH5YIveUz1Uyo0ZInSTJph_lj5Q3V9dwD5q6nGEfGiJ1YHetL8LKAWSLc3HB4DnuFijUFw60qlIWfI6LcRZTZHUAXVOUoIiA59PVYvqV40ziMviDrdMEf86kOITWcPDcv3P1guPCVxRbQvhH0EyzVBwD5pRKQUkke4kIPE9yIqNxQCn3GVfXGkeAzJ_H2ibIY42gpRSyQKmBXojAqZkcQXvjbblpBnaceQjwGu1iUTsvLglqvxd5rPHgpq-0O90-BcFZNUTxiw6C8FRkyzw2gHW9MGjVLu4Edn58LG3YlkoGiFO7qx3Ycl9eO-Z0fAOPQ9iF",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fmuse.jhu.edu%2Fbook%2F14983%2Fimage%2Ffront_cover.jpg%3Fformat%3D180"
  },
  {
    "id": 6,
    "title": "Time Management Essentials: The Tools You Need to Maximize Your Attention, Energy, and Productivity",
    "type": "eBook",
    "category": "Time Management",
    "description": "Must-know concepts and smart strategies for values-based time management—from the new Business Essentials Series. Learn to manage your time, energy, and attention efficiently.",
    "author": "Anna Dearmon Kornick",
    "rating": null,
    "reviews": null,
    "date": "2023-01-01",
    "tags": ["time management", "productivity", "focus", "professional skills"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwhV1LT9wwEB6VXQm6J8pDbFsqizPLOnaSTRBqhcquKiEeB0DAJZokNlrtU5uAUA_97Z2Jwxa49BZFGSsa2_Ow5_sGQKsD2XlnE3zEIAg0Sm5oZkMfrQzSFAPVs1p5hi94B9fx9Yl_fxbc1aU6Veev-nzggPtUjsfLa9SK7IHPzrt_mCPWI7ceUy4Xyu4PXKxAU9H-p1SseXFx0j9dnrkwTpPcP-O7XgTimvZpOUALWliMyMCQ8SkLhh9RXjrkhwItpa8tWCtG9CsFWUlXMll5osE6NA3DEz7BBzPdgNWXuvVNmB9NcDH6zpAO8a-m5ahbvRX9gkFGvNYOBa0McTWbjQtBW12ck_sS5YxknoeT4W_DLxfiuCxdHeS-6FfowH2B01xcOn7YquHEFtwM-lc_f3XqdgodrPK8Tiwj0wtNhmmWBchMfyEFAJ7KLSU1eSazyOZhhDqMPCMxpvnRMe3vMNcUZ-UU52xDYzqbmh0QqLU1WsY2yozveRaljVNfa1QBkrfDNuy90mLyNK6ufovkjarb0HbKTeaOWSPxmN7eo6Dztg27Tt-JE3xS72XFchrcJ8p_7iXpyEWxPkWhn_8zxBf4yL3jue5Lya_QKBePZhca84cs-1avnL_Z3Mnz",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fwww.safaribooksonline.com%2Flibrary%2Fcover%2F9781264988860"
  },
  {
    "id": 7,
    "title": "Total Innovative Management Excellence (TIME): The Future of Innovation",
    "type": "eBook",
    "category": "Management",
    "description": "This book brings together ideas from over 20 top innovation leaders, offering insight into the future of innovation through the lens of time management and organizational efficiency.",
    "author": "H. James Harrington, Frank Voehl",
    "rating": null,
    "reviews": null,
    "date": "2020-01-01",
    "tags": ["innovation", "management", "productivity", "organizational strategy"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1Lb9QwELZgV0L0xFOEAoqQkEBV2sSPPFDbA-2uKiFUDm0PXCwnsQG1zVabbMXPZ8ZONpscKBy4RLuOZcf-xvbYnvmGEEZ3w2A0J3ClhBBMhRjQzMRcmVDkuRI0MYxGGi945-fZ-TH_9gXPdroIdn3afwUe0gB6dKT9B_DXhUIC_AYRgCcIATxH-vH6b4v_orE0Gi7oqQ0x1Bm67Mx-2fN6HNOgYKIXyDuadfYXc8sy4lxMuoipa_B3nVmtXbDUctmb39vg7zsXC_3DySU2TtcHG5WeqKrEb7QEEHhtsLpqBocOFC1AA-czasXkq2OjdeEtNm1F3LY0wqkDdEVHDz2epJED0NllDPONeK-H75EI_br8WTQHugpW9X0ypbCxFxMyPT09nn1eH6shuw9PQ8emijXtDcrZIluqvoTlA5aWpkZdRNUKXVDRz6yAWbQeUdYOl2je6h1nj8hUozPKY3JPV0_Ig85L4SlRFl6_h9ffv1bLy8O-v_f3bILfY-2_d3kQ7_bth48-QO47yP2F8XvIn5GL-ezs6CRoo2UEitIwSQKuM8NyViRMKCoANV7moPyaRGMQMh3xIi6EYUlOcxZmaZnHYcGyWLMwzcOMluw5mVSLSr8gvmLMQHpm0kLzKDIqNFnOGYNyFSgzyiNvN7pR3l7Zm_1aur5Gjh-Wxndn4nH050wtah7Z7nCSMD4dl3stOe51I-ERz0EnbxxBi4ziNGFJllLmkcNNNGVjj8GMi1njaoJdMMrJsEZ5606rqUeCuwoYfarfyYu0TWltrOXs01GMwRKi5OXfNHmbPOzH3SsyaZYr_ZpMbr4XxZtW5n8D0HutPw",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97810000%2F9781000060386.jpg"
  },
  {
    "id": 8,
    "title": "Engaging Young Children in Mathematics: Standards for Early Childhood Mathematics Education",
    "type": "Book",
    "category": "Study",
    "description": "This book consists of conclusions drawn from the expertise shared at the Conference on Standards for Prekindergarten and Kindergarten Mathematics Education.",
    "author": "Douglas H. Clements, Julie Sarama",
    "rating": null,
    "reviews": null,
    "date": "2004-01-01",
    "tags": ["mathematics", "early childhood", "education", "standards"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwhV3dT8IwEL8ovuiTosYh4uL7ZFvXMRLkQYToA4kmYtSXpsyNEGQQQBL_e-_aDQFRH9cst_Z6u_a-fgfA3EvbWtMJnpSccyZtamgW-56Mbd7tSu5WYuY6EQV4W51q58Z7bfOXLfhYQAEmYS8aWRmC4q-FDxsCNlpS7t6uXMIBikKq8Z6pHMoovB8RGMMETdk0rOOwSpUMf0IXw5_Cf7AXjhq0IfCUDTR2JB7XnHlBityTPTsavJPA7coKQwrtLBtvTnip3pPTAWornNmMgEXf-uN4DRSVUFV7YfjjLFAHXGsfclT0cABbUZKnTs5p1kce9toLXNfpIbBm0lNtjcxP0hJmVgpu9hOzNpSTQX34_XqtrEaOoNBqPjZuLfq-SN1FQvPCPYZcMkqiEzADaeMqK6HkofSkZwdd3DnbD8LAkX7F7xpwsbRIMX9XYd6pIE44jOONhjH_r5cW7DIgTwwSYw20IdCYYY5jQH2ZX2KmXBmx7juiqaAlQ8xfpSbm2uPoGmD9R2B9Ghs4YkBxZTQTNqrrDnyc5Xm2f0KtLU2uFc3rRpVTK6DCRrKnsKuTgcirU4SdGLVOdKZlogTb1tNzScnjF2iB--w",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97811356%2F9781135635336.jpg"
},
{
    "id": 9,
    "title": "Discrete Mathematics",
    "type": "eBook",
    "category": "Study",
    "description": "Discrete mathematics remains at the heart of any contemporary study of computer science.",
    "author": "Rajendra Akerkar, Rupali Akerkar",
    "rating": null,
    "reviews": null,
    "date": "2024-01-01",
    "tags": ["mathematics", "discrete math", "computer science"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwY2AwNtIz0EUrE0wSE01NTY0TDUAXmqWZmSSmGZgmJSWaGpmnGRsZpoImeN1CLUNdTKJ8TSOhS3XAN39Bxwf0QPdU5uTAp1HBhz2Axs7160BnxAIrLUsTYMfGwFzfPrGImYHVCJj_gV0xVn9_F1dvWPoC7RMGnVYC2t8F02AIPfYJbgDoyNDENGA_FXJmFLiacRNkYE0F7T0QYmBKzRNhUHTJBOZpYKNWwSY3sSjbzhd-wmqxjT5YRJRBxc01xNlDF2JWPKjFXBxfZhSPYpexGAMLsJOfKsGgYJFoYGFiap6caJqcaJJoYmCRBAweAzOLZAvDRDNzsyRJBlm8RkkRkJdm4DICVsegeW9DUxkGlpKi0lRZBpaC9ORkOWgwAQCi7HMZ",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fwww.safaribooksonline.com%2Flibrary%2Fcover%2F9781299444607"
},
{
    "id": 10,
    "title": "Mathematics",
    "type": "eBook",
    "category": "Study",
    "description": "Mathematics Year 4 goes beyond the requirements of the new National Curriculum and continues to stretch and challenge pupils.",
    "author": "David Hillard, Serena Alexander",
    "rating": null,
    "reviews": null,
    "date": "2015-01-01",
    "tags": ["mathematics", "education", "numerical skills"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV07T8NADLZoWOjEU-UpxICEqkAed0mQCgtQuiAxtIiyVE56QRU0IJLy-7HTPI4uwMBySpzElztbvpc_G8B1Ti1zwSYIRCmlixYnNIs9gbElwxCl48euYys-4O0OzgfX4ulODuvEmTXtXwVPNBI9A2n_IPyKKRHomlSASlICKhfmx9VtkZ6piseqp46fjNs9zjM0d2hnJ98Ea5CLvgVgS8bCzRH1udBukZb2qn1fgnvK1aHNAw9Hi_F1czfkAEGiNv-VU572hW8fc-Tx6XgSZRcqMWdpAxr0mOyF-fBY7WExjFa4To6XK6pyyzBaZdVNaGL6QgabjHnGPuZeMXb3V2FZMaBjDZZUsg5NrV82oNWZUnMuNVrnLKdswkn3pn_VMzWuo8_X_Gg5HX1rg7sFRvKWqBYcBmgF9DMRyggFCisISfssL4gCGz3fC7fh6Gd-O795aRdWahHtgZF9zNQ-GO_PUXSQ994Xnvrwog",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97814718%2F9781471856471.jpg"
},
{
    "id": 11,
    "title": "Microfluidics: Modeling, Mechanics and Mathematics",
    "type": "eBook",
    "category": "Study",
    "description": "This lab-based guide to nano- and microfluidics includes practical techniques, protocols, and experiments.",
    "author": "Bastian E. Rapp",
    "rating": null,
    "reviews": null,
    "date": "2016-01-01",
    "tags": ["microfluidics", "engineering", "mathematics", "modeling"],
    "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwhV3NT8IwFH9RuMjJz_iFWTw7VrZ2LYbIQSAmZuEiRr2Qt641hDkNA47-7bZjIHjx0kNf2sNr-tr39fsBBH6DuH9sAkVkjAVILKGZDilqwuIYmc914DeVTfD2h61hl75F7LUs1SmYv8r4QMPyVKbpOo1agD3Y2Ln37RWoTYzxwDxexOvgdBeqvrn_xhWrDgbd3uNvzIVzLqgo-rvKBS8r2KfVBjWoYT4xBsYYn1luAURRG6_V2GdePjr9fagq24lwADsqO4TaBnLgEXQiW0in0_k4Gcv81rGUZrax_MaJlO3lNZMOZonT_sDp5C5aY7Pmba-YOYbnfu_p_sEtuRBctJB5wtXcel7cImZJXyaaBFQ1qTIOj2ShMoOiiRGG3PwXFNExUl-iSmJB46BFW83gBCrZZ6ZOwRFIBGVcIpNI0Wwem6MgoZCiiSEP4zO43lDBaJEWedt8tKWnM6gvNTNaChf-tvz8H_kF7Jm_R7isDLmEymw6V3WofL1LeVWe2w8-f57k",
    "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fwww.safaribooksonline.com%2Flibrary%2Fcover%2F9781455731510"
},
{
  "id": 12,
  "title": "Combinatorial and Algorithmic Mathematics: From Foundation to Optimization",
  "type": "eBook",
  "category": "Technology",
  "description": "Provides a from-scratch understanding of optimization, discussing 70 algorithms with roughly 220 illustrative examples and 160 nontrivial end-of-chapter problems.",
  "author": "Baha Alzalg",
  "rating": null,
  "reviews": null,
  "date": "2024-01-01",
  "tags": ["mathematics", "algorithms", "optimization", "combinatorics"],
  "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwhV07T8MwED5BsgALT_EqysDaxnXiFEsVCNFGSKjqQgdYItu1CyINKC2M_HbuQhQeA4y25Ycs3_m-O_s7gIh3WPuXToiVEkJEilFCM5fEyjGhtRK85yLetRTgTSdyMojvR-KufqpTZf6q_QMdylOZ500YtSJ7IN95-E4csWjGoFkgZMzCC1Wugs9R_hGK-ePxYHjT-Fzw8EZMEjhrOnRr2qdmAKIMVQ5x6saX1kw3wbf092ALVmyxDeujhlJ1sQMJSi6iWMLIeGQCVUyDy3yGheXD_NEE_bkqn86_9eiHVc0unKbD26vr9ud0GRnVi-yNZz-WE-2BVzwXdh-CXmyE1Ko7dWcJXrtSa-aMdRQYk4l25gBafw51-E_7EaxxvLHJccnlMXjL8tW2wHuZGXNS7-QHQyN_oQ",
  "image": "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fwww.safaribooksonline.com%2Flibrary%2Fcover%2F9781394235940"
},
{
  "id": 13,
  "title": "The Joy of Mathematics: Marvels, Novelties, and Neglected Gems That Are Rarely Taught in Math Class",
  "type": "Book",
  "category": "Study",
  "description": "Encourages educators to share the joy and wonder of mathematics beyond the standard curriculum, revealing overlooked and fascinating mathematical ideas.",
  "author": "Alfred S. Posamentier, Robert Geretschläger, Charles Li, and others",
  "rating": null,
  "reviews": null,
  "date": "2017-01-01",
  "tags": ["mathematics", "education", "fun math", "teaching"],
  "url": "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwdV1NSwMxEB1KvehJq2JrlQXPq2m-dheqF3XRQ0HBHvRSkjQpKN2FVg_-ezOb3RZlPSZDQjIkmWQm7w0Ao5ck_nMmcKWEEEwRTGjmJFeOCK2VoIljdGQxwJtPs-kdf5uI1w58bagAC7OwZdwwKP4LfGgJ2ISV8ji_psgDZA1ivD-rP5TWPJVIxrDyT9k6rEMTf5VACLwUSMAvn8nWUZNybyQxt5-_urAUoahJzRXVlBkyoy6MCV8oq4M234cuohUOoGOLHuxNNiSs60O48Esgei-_o9JF46Vafdwst-LxVVVzBIP8_uX2IcaOZ7UvZxYGSo-hW5SFPYEo4UZkWo3mLpXeFmdaE2esw2hZJrUzfei1dNCH4a_aRnFe7M23HLQ2OoVdVETwPwxhx_n9Yc_CzM8rnf0A92SNlA",
  "image": "https://covers-cdn.summon.serialssolutions.com/index.aspx?isbn=9781633882973/sc.gif&client=summon&freeimage=true"
},
{
  id: 14,
  title: "Mouvement dans un champ uniforme - Spé physique Terminale",
  type: "video",
  category: "Technology",
  description: "Apprenez à analyser le mouvement d’un objet dans un champ uniforme, comme la gravité. Cours niveau Terminale spécialité Physique.",
  author: "Les Bons Profs",
  rating: null,
  reviews: null,
  date: "2021-03-12",
  tags: ["physics", "motion", "uniform field", "high school"],
  url: "https://www.youtube.com/watch?v=b1t41Q3xRM8",
  image: "https://i.ytimg.com/vi/b1t41Q3xRM8/maxresdefault.jpg"
},
{
  id: 16,
  title: "Sermons (The Fathers of the Church, Volume 93)",
  type: "eBook",
  category: "Theology",
  description: "A collection of sermons by Saint Leo the Great, translated as part of 'The Fathers of the Church' series. This volume offers insight into early Christian thought and doctrine.",
  author: "Saint Leo the Great, Sister Jane Patricia Freeland, Sister Agnes Josephine Conway, and others",
  rating: null,
  reviews: null,
  date: "1996-01-01",
  tags: ["theology", "early church", "patristics", "sermons"],
  url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV3JTsMwELWgSIgbq9jlE4tKojRLkxx6gEKFKjh1EeJSOalTRYIUdREHfp4Z21kRqjhwiRwnsWV7NHmeeTMmxDJ1Q6voBJsxx3EsZuCBZlHTZpHhBAFzTDeyzAZHB29n4A_u7ddntO18peczZXX_uvBQB0uPgbR_WPysUaiAMogAXEEI4FrBx9mtCvEAlYs0GECQKAodifRSSkB-CNRQqKe6X7S4PnEJSIX9QNqN45wf05lxnvIh23pP7-p3QsX0UGJm9S4D3Coz_8c5DWiafDJJKxNfFN6_nYC2VZ6IgpO_2MvPJnHu-Lz1-8hEwD2SN8XP-C2Xv7EK-ataOMQBfgyNxHFYoasor1aJriJ3xoB0LHT8KEtpOaV2-rwB6NW4wBzr7-M4XLR4oi3n62Td9VDFa8OXzFoHSAZwpS8SiKqGPZW-KeuobD2DH7qjUEp_m2xwDF3ZIWs82SWbKdt8j-hKGOgVjJKqCaPTiEKBygm7oVIQqG9d75PLzkO__agVOhoJr_p8VBqUdUBqyTThh4QyFzBwZDrM8w3bDUzYp_CmF-LGOgoagXVE6KrWjle_ckK28qU7JbXFbMnPSO1jEobnYiq_AaI2QHc",
  image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fmuse.jhu.edu%2Fbook%2F21074%2Fimage%2Ffront_cover.jpg%3Fformat%3D180"
},
{
  id: 17,
  title: "The Business",
  type: "eBook",
  category: "Theology",
  description: "Winner of the 2015 Colorado Prize for Poetry, this book explores the meaning of work in the modern age through lyrical and witty verse.",
  author: "Stephanie Lenox",
  rating: null,
  reviews: null,
  date: "2015-01-01",
  tags: ["poetry", "literature", "work", "modern age", "Colorado Prize"],
  url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV07T8NADLZoWBALjwKFgjJ1QUHJPZIwMEErhiAh0SLKUt2lF4QESZW0Ej8fX7gmJIKBgeWUePBF9slnO_ZnAEouXKdlE5gQnHMqXD3QLPGZSFwupeAkSCjxlP7BO5pcTm7Y8x2f1jNTa9q_Kh5pqHrdSPsH5VdMkYDPeARwxUOAa8s_rl5r_a-r2qs0ii7p0j3l55FKs4_vEb_HWxF_u4WwrNtAS5mLedaIDr0w5OhPsK-5eU2s6enD_TBqkstLjWgsR0YGGnj8ff4aL69U6qyKDnSQH5oL5_GpTmFxjRVDysZ8s5NvULSqnTGsWKj8TZWTpEJzC413YFPpXo5d2FDpHhxGJjdb2AM7quCki33YRmHZa2F1oT8ajq9vHcNxpgVbzMwn0wOw0ixVR2ArGbhJIAMpGWPCkyH1Q0UCSZmP3s5c9aD7I4vjX-gnsFXroQ_WMl-pU7AWL3F8VorkE4B54k4",
  image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fimg.perlego.com%2Fbook-covers%2F2031342%2F9781885635488.jpg"
},
{
  id: 18,
  title: "Breast Cancer",
  type: "eBook",
  category: "Medical",
  description: "Part of the Radiation Medicine Rounds series, this volume offers an in-depth review of contemporary radiation oncology practices for breast cancer.",
  author: "Michele Y. Halyard, Alphonse G. Taghian, Charles R. Thomas",
  rating: null,
  reviews: null,
  date: "2012-01-01",
  tags: ["radiation oncology", "breast cancer", "medical science", "cancer treatment"],
  url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1LTwIxEJ4IJkbiwWd8h3gwMZslQLcFDhyMSriQGAJGvZCyzqIRFsOCif_eme3SBS7qwctmt22m207TTjvffAUQ5ULRXZkTPK2llEIX-UKzQHk6KMp-X8tyJRDlErKDt9GtdW-955Z8Srk_07R_VTylkeo5kPYPyrdCKYHeaQjQkwYBPVfsY_s5ZyviW3kY1OWnANymHn5pA2Y3GFB0rCl7HcPUmYm64HT04PXNHI22LCQ48cw77UICK1rI5rZgVG8z00E8ouY-e2fC9zYtHS4wSsNzTSylQYjgaBxZl9H9rL-0-yTbT9GGSyWU3sl0KtKVxeL9uDAzv5N1p9Qlk5qPSOS0jqE7izKQoWyaityHR3s8xjGvZFpxKN68loQvKa01BzkdvdNaQOvENDIcX_Fq19mGdeRYkR1Yw3AXNlpJm_dgy_R-3vT-Plw17jo3TXdBTu9zGPupo97SX4sDyIbjEA8hL7USqJREFCUPX0TV10KJSklWsRag8o7g4md5x78pdAKbqVZOITudzPAMsh8D3z-P--sb4aIKcw",
  image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97816170%2F9781617051166.jpg"
  },{
    id: 19,
    title: "Are There Limits to Science?",
    type: "eBook",
    category: "Theology",
    description: "This book is based on the 2016 conference of the UK's Science and Religion Forum and brings together leading thinkers to explore the boundaries of scientific knowledge.",
    author: "Gillian Straine",
    rating: null,
    reviews: null,
    date: "2017-01-01",
    tags: ["science", "philosophy", "religion", "limits of knowledge"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtR27TsMw0KJFQnTiKQoFRexBTvxIMiAkSgsLE20FLJXjB0KUFNGU7-dsnKbtBAOLldiSY99d7s7neyBE4gscrvEEKgRjjAhsC5oZToXBLM8FixND4kjbC97-MBve0Od79lRXH6v7_hXx0Aeot4G0f0D-YlLogGcgAWiBCKBd048Xr1VKWW2VSmgnNobJJXLw4q5y5nPuvLZEhDNq3jrLS7FsBgDRgtMwrs0AdYTXgz8UL9mxVs6McIICJYWlnsetJpu248ymfMcUOJnNPv6uXmV5qYtwPmugBgwDzwhHj9U_G2dJlsR1CjpiVTruU8Q5OxeIO0ISF1PnP0yrVFvVQlqoJWZvwNRh5eVsVSoyL8EGO2hT2_iPXbShiz20Vbls76MOQDRwEA1-IBqU08BD9OoAjfq9Qfcu9LUlQgFKScpChbkwJiZK8ExxRYnOExkZaRTHEqtE5coQnTIJy1fYAK1GOotFTiXQssSCHKJmMS30EQqY4ERzzrQmEdWKpFIQTpKIpTozmtM2Ol_a3vhr4u7BZ-MVYLdRUO167Ma9c-64d91lVs_k5Pg385yg7Zo8OqhZfs71KWp-vEh55jD3DQQ5FHI",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97815275%2F9781527500419.jpg"
  },
  {
    id: 20,
    title: "Biographical Dictionary of Women's Movements and Feminisms: Central, Eastern, and South Eastern Europe, 19th and 20th Centuries",
    type: "eBook",
    category: "Theology",
    description: "Contains 150 expertly-researched biographical portraits of individuals involved in women's movements and feminisms across 22 countries in Central, Eastern, and Southeastern Europe.",
    author: "Francisca DeHaan, Anna Loutfi, Krassimira Daskalova",
    rating: null,
    reviews: null,
    date: "1920-01-01",
    tags: ["feminism", "women's history", "biography", "Eastern Europe", "gender studies"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV07T8MwED7RsLAgnuItT3RAQUkcO83ARKk6wNYiYKnc1EERNKmalt_PxY7sJkvFwGIll8iW_dnn853vDoAG957b4gmhEIwxKrwqoVnKQ5F6bDoVLIhSGviyMvAOxvG4H368sHebFMHS_hV4pCH0lSPtH8A3lSIBn3EKYImTAMuWfGxeawttpoNR14xNuS8IbU9XWStLXM4qVvhKR2muo4zMbaJ5ORTCCLdJVtpLPc_FepVm-j5kbqh9UX6J7-JHO5ktUSrP5tlSWL0CinleS69QK5fvjFGg7bnYOIjiMo5QEKQ6YXErgjV-5-okRKOA31Yhzecz7PaDzN112YFO1Ks4qvv6ZpRjyHR8lGTxFG0q9nW0JNtQU1mF-2dc73WjA9iVlafIIezI_Aj21ah2S1LfzDyGeBMCYiEgRUo0BMRAQBACYiA4ge7gafQ4dDeaniizdjlpdJOegpMXuTwDwgSnknMmJfVDOaO9RFDshc96Mk4lD8-BbKvtYvsvl7BnUbwCZ7Vcy2twFp9JcqMG9xfBKhzX",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fmuse.jhu.edu%2Fbook%2F21672%2Fimage%2Ffront_cover.jpg%3Fformat%3D180"
  },
  {
    id: 21,
    title: "This is not Architecture: Media Constructions",
    type: "eBook",
    category: "Study",
    description: "This is Not Architecture assembles architectural writers of different kinds – historians, theorists, journalists, computer game designers, technologists – to explore how architecture is represented, theorized, and communicated through various media.",
    author: "Kester Rattenbury",
    rating: null,
    reviews: null,
    date: "2002-01-01",
    tags: ["architecture", "media", "theory", "representation"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1LT9wwEB6V7aVwKbQVCy2seuilSpv4EccHkMpLvfQGqHCJHMeuEG2omsDvZybZzSapWEAIKbJiZxRNMvZ4xvZ8A8DZlzAY6ARhjJSSm5ASmvlYGB_KLDOSKc9Z5GiD9-hEnxyI8x_yrJOfqW17VsFjG4qeAmkfIfz2pdiA99gFsMROgOXAPm6rM_lflJStvLiqPn_r7Bb03Hw2cPP754Nm_h_F16OBltRgn_9pQwLbaw5A0Haj1iJqQoAHANPoBhBl2qNLb5rlOvaJIMj_5Be22nFFcF0uwZJKSAMGpz_bxSw0nJIZzHtd5xTsrKYIADWHuq1QrO0c-qhhv1snE6NBQyW2vvbYWoZlU16i-sepoSoH8LL96ZRPp8Dj1_DSUeDIKrxwxRqsdP_5G1gncUzwQnFMuo_ewunR4fH-92CalCIwMWWKDzS6I9Z45ylNs8w4s5HjJtZCRl662KPKVCwTNsyVT0LlnOZSOWZxHslkrBP-DkbFVeHWYcJyo3muhebCCPT7TGJzqzSOq0hLxZMxfOx8bXrzu95AL_uSWkAURRztYxXH-gFEKh7Dbvd3plW9ZuSbBC8N_eK-MobgvhcMWN-eCSytGZoeSE4P9_YZrU2KMUzupJBoqYacbTyV6014NR9w72FU_bt2H2D095e1W3U3vwW8qG7i",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97802039%2F9780203994122.jpg"
  },
  {
    id: 22,
    title: "OpenGL® Shading Language, Second Edition",
    type: "eBook",
    category: "Study",
    description: "As the 'Red Book' is known to be the gold standard for OpenGL, the 'Orange Book' is considered to be the gold standard for the OpenGL Shading Language. This book offers comprehensive guidance on GLSL for graphics programmers.",
    author: "Randi J. Rost",
    rating: null,
    reviews: null,
    date: "2006-01-01",
    tags: ["OpenGL", "GLSL", "graphics programming", "shaders"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwY2AwNtIz0EUrE0wSE01NTY0TDUAXmqWZmSSmGZgmJSWaGpmnGRsZpoImeN1CLUNdTKJ8TWGLLME3f0HHB_RA91Tm5MCnUcGHPYDGzvXr9A2AJoD2k1oa6dsnFjEzsBoBMz-wH8bq7-_i6g0fcAHNOQHbQuAZW5gG6Ak8ML4x6LzQxDRgJxVy0zu4CHUTZGBNBW08EGJgSs0TZuBGOihQhEETtO7D3efQOoXgDPCidwUf6DijjkIwqEubouCaAl58Jcqg6OYa4uyhC7EhHtSILo4vM4pHOMdYjIEF2OlPlWBQMEpJtDROsTSxNDZJNAF2CRItklOSzS2BQW5oaWpubCHJIIXbHCl8ktIMXLBhBCNTGQaWkqLSVFkGloL05GQ5aJgBABh0d2g",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fwww.safaribooksonline.com%2Flibrary%2Fcover%2F0321334892"
  },
  {
    id: 23,
    title: "Feminist Methodologies for International Relations",
    type: "Book Chapter",
    category: "Theology",
    description: "Over the past two decades, feminism has made refreshing, often radical contributions to the study of International Relations (IR). Feminism is no longer a rare...",
    authors: ["Brooke A. Ackerly", "Maria Stern", "Jacqui True"],
    date: "2006-06",
    tags: ["feminism", "international relations", "methodology", "gender studies"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1LS8NAEF60J_Hi-y05eZHU7ivZFTz4Kl7ESyvipWw2GxFsK32AP9-ZJM2jVlDES0g2mSXLN8zOzM6DEM6aLX9OJghjpJTctLChWRIIk7RkFBnJwoQz6vCAt93V3RvxfI--nVl3oHLsX4GHMYAeE2l_AX4xKQzAPbAAXIEJ4DqnH9c9sVlroqxyyOT0Pu0Tnco5lxZgmPMEFiFxBf4YbZE3oR5hVc7Ty2aVu4qZ-7-aueJeCHxWCrGFmWPV6JDMEMUUYBWAdkkrwpBWdtUsofKLvM6KPF1fPaRzUDS2wFzH46FyfyqiBmvf9D76b715wkvQGE-wZno_frWTCzfwp-NlsgxmPkg6__Gp8L6h5khVmCcvB-j-UvlDugyW12aaveTlc7bMWRYmDc8W_X21Ugds7SrfjjtrZBVzWDxMLoGlrZMlN9ggOzVkvAKZTcJmcHo1OD2A0_uGaIt02red6zs_b6bhWxDJGDUqeYhR_1jvx9DAKplQy6lpqUgrKiyLhXRci8Bq0AoTqZXTMVMuiQwzim-TxmA4cLvEY7HRPNZCc2EEWKtG2diGGqQB1TLkao-IYu09Gw17P8Ntj5xXyIajNFhg_EPi_b8QH5CVkvMPSWMymroj0nh_sfY4ZZtPmP9tLA",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fassets.cambridge.org%2F97805216%2F78353%2Fcover%2F9780521678353.jpg"
  },
  {
    id: 24,
    title: "Not for King or Country: Edward Cecil-Smith, the Communist Party of Canada, and the Spanish Civil War",
    type: "eBook",
    category: "Theology",
    description: "Not for King or Country tells the story of Edward Cecil-Smith, a dynamic propagandist for the Communist Party of Canada during the Great Depression. He is most...",
    authors: ["Tyler Wentzell"],
    date: "2019-01-01",
    tags: ["Spanish Civil War", "Canada", "Communism", "biography"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1LT4QwEG7c9eJN1_X94OTFoFBaoAdPysbE1YNh1d2LGWgxGkWjaFx_vdPCgm5MjAcvFErTlplhykfnQYhH9xx7SicwAM65B45OaJb5DDKHJwlwGmQedZXe4O0NxOCIjU75sEmW19T9K-OxDlmvHWn_wPy6U6zAcxQBPKIQ4HHq-7i-rBxqHwtjQnhizJqfjfN50dj8xsN-dL57GZ3Fo6jf_4r9XZO4wG2Q4nfbjbgMefDNdqOEia5GJZSGZbKeaaXpuSZE-t1eWrwVwTsPPpq1obbY-7mdDk_-IG_T4kDl9utLi7RwMFQq9sVV_aNLb98gaDFOddU0_Emsrcm0SsdJPcD-l-4bE1FcF6sFLZ4ns0q7gSyQGZV3SLeMpjK2diwdqhdMOuRxh8xX5oNwb1VKcpEsI-UtpLylKW9hWVG-Swa9KD48tqv0Eza4gcdtRKa-HybUTVQAkvkAmZ9gmSUCb4XSSZkSjpBUKgYygSwQKVARJiYRE-rtJdLOH3O1QiwqQXhSMOExYAjwIExlGgh8gVzBAy9cJdvmSa-1qLxcIzDTtEBgVtNi7dcW62SuEZEN0i6eX9UmaT_dpOmW4cgnUUEScg",
    image: "https://covers-cdn.summon.serialssolutions.com/index.aspx?isbn=9781487522889/sc.gif&client=summon&freeimage=true"
  },
  {
    id: 26,
    title: "Advanced Excel Reporting for Management Accountants",
    type: "eBook",
    category: "Technology",
    description: "The advanced tools accountants need to build automated, reliable, and scalable reports using Excel. Learn about the functions that work together to automate...",
    authors: ["Neale Blackwood"],
    date: "2014-01-01",
    tags: ["Excel", "reporting", "accounting", "automation"],    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV3NT9swFH9irRhw4WuI7Itoh93SJbEdO6dphVa7IKFpnQSXzHZsVDVrCwHEH7A_fM-N0xUkxC67JdFzIvs5P__s9wVA0l4cPcIEKiVjjMjYFTSzGZU2ZkpJlnJL0sQ4A-9wlI9O6MUpO1-Dn21ozMJi6N0Uey1WLm2p80uto4VI7T0ue000wOeyIbiZK76UfZxfRa7MlDPH-pobL6CL65rAX6LbP-uPvq0cy-B6SeNFTaFEZAzJZ-IzQ7X3sU_ViVjyyT_n3CWd2YItWU8QmxC3bmoXuYRb2jFerM_NdWUuZw9Y7EY9GVdVjWCL2J953B5uw--27653vXH5axmX_ShR5P8cnx3oGhdssQtrZroHL1sv_D3YbqtNhB589oF88e4K4eBemypstg648obIu8O_bjyhL4DhHHxewY_h4Pvx18iXfIhkhtw0jbTVUuGsYiJnpWZaCymykuSx5QgtwpDEWEsV8s5EIU4rYfIyt7mwcZlokWlyAJ3pbGoOIbSEWpFaRBycdpyXskRlWSXxBVwxygP4sKKu4q5qRqpY6tpxmX8QytMADhtVF_MmRUjhYmOQ6HERwL5XfuEb5kJQEkDYaqtY1WEx6B97rQRwtJwhTduU3vNCTeyCV1IinpSYtRKvn__MG9hEDkibU6W30Lm5vjXvoOOmznv_c_wBo5kmbA",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97811186%2F9781118658185.jpg"
  },
  {
    id: 27,
    title: "The Politics of Energy Research and Development",
    type: "eBook",

    category: "Research",
    description: "The Politics of Energy Research and Development examines and evaluates U.S. research and development policies to promote nuclear, solar, conservation, and...",
    authors: ["John Byrne", "Daniel Rich"],
    date: "2017-01-01",
    tags: ["energy", "policy", "nuclear", "solar", "R&D"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV07b9tADCYaL22m9IWoTQqhQzcl8j101pAlqYMu3WyjzSKcpGMRJHGMyOnvL3knWYqGIh26CNbhoBP4nUkeRX4EkOIkTUY6QVmrtZY25YZmmCmLqS5Lq4VBKaaOP_BeLvPlV3X1Xf_smRP7sf8KPI0R9FxI-w_g7x5KA_SbtgBdaRPQdeQf7257_Dchuc1na7hQ5NeS-4R6trrPGArahVmPm7N5mLrxlMGegLbLNKxDvdxsHB5YDLqOc_VEFwEM50dWMdz0M8QTx9qUyfpCAsVUTrkPTB6IsEYE1dOM3QRJdv4L05Xf1dfV9sytk8dmD_bIASElk6x-7AJfImUKPuO5ONvV85YJafc2gQyV1z99svo-7NvmhrQ_WYZtw7VhFWm-ZkQz-9SszlqTuDiACUvgNbxw6zfwsiv8bt7CKUESd5DE9xgHSOIOkpggiQeQvIPV5Xxx8S1p-1UkVnJfiaQk066soJta0MlaYZ6jysgpI79Il6aiw6OuXOYyTGd2JrBGUZF-LBGtFKmq5HuYrO_X7hBilAppBqlL-s8YU9ua5ICldYim1MpE8HkgieL3rf-23hReXOQEG5Nm4hmTTB5BFKRYbAK_SdEDGkEyFGyx9VEkDC1fBs_q8Ikg7iRf-LXaDONifn6h-TCQqQ9_We4jvOq38BFMtg-P7hgmm19V9clvoj-Sw1E2",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97813514%2F9781351477062.jpg"
  },
  {
    id: 28,
    title: "How to Coach Your Team: Release Team Potential and Hit Peak Performance",
    type: "eBook",

    category: "Management",
    description: "How to Coach Your Team helps business managers coach their teams to peak professional performance. It includes: Becoming a team coach - coaching skills for...",
    authors: ["Pam Jones", "Viki Holton", "Angela Jowitt"],
    date: "2016-01-01",
    tags: ["coaching", "leadership", "performance", "teamwork"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV3dS8MwED9dBXFPfo3NL4oPvkilS5qmefDFbSKI-KKCvpR8NDJ0U2wn-N972bruAwR9EEpoQ5OS3x2Xu17uDoCSszBYkgmRlIwxKkNX0MzGkbQhU0oywi0l7cw5eC_vxX03erphj6srU8_MrO9fCY99SHoXSPsH4leTYgfeIwtgi0yA7ZJ-XD2WRX9crbi3Uz0OmPpCjjlFcg5mB2aqFP2DecO_vWz4o8h0KvmCPdh2tac4F6XMWEwknaCthFcSn7is4gPT18V5NgxGeQ1qqCd4sHZ72-1dz_5Qcad8JS4abjptVCbJqj5Th7rMX1Aco6gucheshVZ8P1_c2ES5Kd1tguciOLZgNRtuw_r0aP8ONBATv3jzx5j4DhPfYbILD5e9u85VUNaFCCQqXzwOoiwWStiQWqs0USSRWjOmOcvcEolQkltCpGxTo41QCQ0NN0ZTJozhsdC0Ad4QcW6Cb2lkE2JRLCFvcm6kweVZJTNruWIRb8Hx3ALTz9exDztP51BIfvOSiFrQnICTvk_yiKQVQVrgT-FKx0PLg7lp76LjMolTwvd-Hr0PGzP2OACv-Bhlh-C9P2t9VNL0Gx2iEIc",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97812920%2F9781292077987.jpg"
  },
  {
    id: 30,
    title: "Operational Risk Management: A Practical Approach to Intelligent Data Analysis",
    type: "eBook",

    category: "Management",
    description: "A practical guide to identifying, analyzing and tackling operational risk in banks and financial institutions. Created for banking and finance professionals...",
    authors: ["Hong Kong Institute of Bankers (HKIB)"],
    date: "2013-01-01",
    tags: ["risk management", "data analysis", "banking", "finance"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV07T8MwELagSAgmnuIti4EFBcW1HSdILOUhUAVdygALutgOQkBakZTfzznNq51gYLESJ3IUf459Od_3HSG8e-Z7c3OCAJBScvBdQrMkEJD4Mo5BdlXCu8y6Dd6bx-jxSjzfy6cmZVFT96_AYx1C74i0fwC_bhQr8BiHAJY4CLCcs4_r0yn-g7H9qhx9Rfz4Zx3oMiU4l_wopxUwbnhVb7VEZ37qokdPoVQtqfF3yYn6o_k4gx6k744LjAbrbf-uVzkY3DvazOUqzktFaBe1XjKz2h4HVsT3TQmjzbzm1f7FmR9SXyi0KVRQqnzPKlm3rit-4qTNP82bzi9s6k2yRbKoQpxZlwaDq-t-4yZzO6tSFloCZdO80k2qHrVKViF7xzUB14s8m8axFqvhcI0sWccZWScLNt0gyxWZYJM8tFCgDgXaoHBOgdYY0AoDmo9oCwPqMKAVBltkeHM9vLz1ygwWHgSh74XGsth5H3SMZh6uDUaFkYFQgOFcR8ATE0mIhdJRYJiyzNcJiwD_JPDV8Evh26STjlK7Q6iQhjPAGVPrWBRWNeNdrYyAwIdEsF1y3OqDl--PYq89e5np81_cFPp7v2lpn6w0I-OAdPKviT0knfGr1kclhD_t-z6M",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97804708%2F9780470827673.jpg"
  },
  {
    id: 31,
    title: "Asian Marine Biology Vol.7 (1990)",
    type: "eBook",

    category: "Research",
    description: "This is the annual journal of the Marine Biological Association of Hong Kong. It contains papers on marine subjects of interest to all Asian biologists.",
    authors: ["Marine Biological Association of Hong Kong"],
    date: "1991-01-01",

    tags: ["marine biology", "Asia", "oceanography", "ecology"],    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1LS8RADA5uRfDmE9fHUgVBkS7Tdqa1B0_qsiB7213US5m-RNRu0e3Bf28yfdEiigcvQ5uWDCTTTDJNvgDY1pAZHZvApRRC2JJRQ7PE4TJhIgiksNzEtsyYfvCOZt7shj9OxEOTItXQ_lXxSEPVUyHtH5RfM0UCXuMSwBEXAY4d_7i-LbOPVXXkRFJ1X9lx8vNivngdugqbCbeH6hAgKovgzE7MP6Y2RHc0dMsJW9Gh51gW89A_YY2xr1Pw2s8JZ_wteg6XV3Fq5B896LmXZOaM-X31dZoY2aBzY9YnWITUZTFqlFEzKiGNGsYEu_ySq5TeAoNL7VLTDViNqZZjE1bidAvWSilsw7ESjl4IRy_JuhKOfkaiOd-B09Ht9HpsVHz9rIDl8FsT27ugpYs03gOdi8g2JRqbMAy4ckgxAg_diEuHyYSbfRj8zKsPJ9--gMEJpbg4ws-iZP83Lgew3qjyELTlex4fgZY9heFACfoL3Bzw0g",
    image: "https://covers-cdn.summon.serialssolutions.com/index.aspx?isbn=9789622092730/sc.gif&client=summon&freeimage=true"
  },
  {
    id: 32,
    title: "Rich and Poor Countries: Consequences of International Economic Disorder",
    type: "Book",

    category: "Management",
    description: "An analysis of the global economic system and its impact on the disparities between rich and poor countries, discussing trade, aid, and international policy.",
    authors: ["Hans Wolfgang Singer", "Javed A. Ansari"],
    date: "1992-01-01",
    tags: ["economics", "development", "inequality", "international policy"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV07T8MwELZoFth4l6cysVRBSWwnzcCAgAohMdHyWqqLH1UlSKo--P2c7TShlRgYWKzEiWzlzrpX7rsjhMaXYbAmExgA55xCaBqa6YSBDnmeA49TTeNImR-8vUE2uGXvj_yt6TjXzP0r43EOWW-AtH9gfr0oTuA1HgEc8RDguGYf17dVte2xcKC1SVlOO7YlxPRHwuCTDedZxYPKqvNSfugRVFrMRgVm4DDoD_CFNul1Ex1wmaQr0YHVtKKl22hg-ejWcZcZu1ZvGm2gLEE_jF2Y4uOfcizmV6oIFrMWaaE5gSIjeH6tw1hW5UdRhfW3i9KmrpHbxGC40Lm3hT1Zpaj628QzaI4dsqGKXbK5hGHP9sihIZCPBPINgfyaQPtk0Lvr39wHVZeIQEQsxqOVAbphNJda0TyBFH2kPOaQpDqTYVehTOKSocjH11AR66wbckAjUwg0bBPJJD0gXlEWqk18xiWNAMWSEDmzpiv66iKVDJIQNIuOSNt9yHDiSoEMa2Id__7ohGw1nDkl3ny6UGfEm4yEOLfE_AZlD---",
    image: "https://covers-cdn.summon.serialssolutions.com/index.aspx?isbn=9780415094597/sc.gif&client=summon&freeimage=true"
  },
  {
    "id": 23,
    "title": "The Science of Learning",
    "type": "video",

    "category": "Study",
    "description": "This video explores how our brains process and retain information, offering insights into effective study techniques based on cognitive science.",
    "author": "CrashCourse",
    "rating": null,
    "reviews": null,
    "date": "2017-09-18",
    "tags": ["learning", "cognitive science", "study techniques", "education"],
    "url": "https://www.youtube.com/watch?v=1xeHh5DnCIw",
    "image": "https://i.ytimg.com/vi/1xeHh5DnCIw/maxresdefault.jpg"
  },
  {
    "id": 24,
    "title": "What is a Neural Network?",
    "type": "video",

    "category": "Technology",
    "description": "An introduction to neural networks, explaining how they function and their applications in machine learning and artificial intelligence.",
    "author": "3Blue1Brown",
    "rating": null,
    "reviews": null,
    "date": "2017-04-05",
    "tags": ["neural networks", "machine learning", "AI", "computer science"],
    "url": "https://www.youtube.com/watch?v=aircAruvnKk",
    "image": "https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg"
  },
  {
    "id": 25,
    "title": "The History of the World in 7 Minutes",
    "type": "video",

    "category": "Study",
    "description": "A rapid overview of world history, covering major events and civilizations from ancient times to the modern era.",
    "author": "Kurzgesagt – In a Nutshell",
    "rating": null,
    "reviews": null,
    "date": "2016-11-30",
    "tags": ["world history", "civilizations", "timeline", "education"],
    "url": "https://www.youtube.com/watch?v=3PszVWZNWVA",
    "image": "https://i.ytimg.com/vi/3PszVWZNWVA/maxresdefault.jpg"
  },
  {
    "id": 26,
    "title": "Introduction to Statistics",
    "type": "video",

    "category": "Study",
    "description": "This video provides a foundational understanding of statistics, including key concepts like mean, median, mode, and standard deviation.",
    "author": "Khan Academy",
    "rating": null,
    "reviews": null,
    "date": "2011-03-15",
    "tags": ["statistics", "data analysis", "math", "education"],
    "url": "https://www.youtube.com/watch?v=Vfo5le26IhY",
    "image": "https://i.ytimg.com/vi/Vfo5le26IhY/maxresdefault.jpg"
  },
  {
    "id": 27,
    "title": "The Basics of Quantum Mechanics",
    "type": "video",

    "category": "Technology",
    "description": "An accessible explanation of quantum mechanics, discussing fundamental principles and their implications in modern physics.",
    "author": "PBS Space Time",
    "rating": null,
    "reviews": null,
    "date": "2015-07-22",
    "tags": ["quantum mechanics", "physics", "science", "education"],
    "url": "https://www.youtube.com/watch?v=p7bzE1E5PMY",
    "image": "https://i.ytimg.com/vi/p7bzE1E5PMY/maxresdefault.jpg"
  }  ,
  {
    id: 33,
    title: "Allegories of Union in Irish and English Writing, 1790–1870: Politics, History, and the Family from Edgeworth to Arnold",
    type: "eBook",

    category: "Research",
    description: "Mary Jean Corbett explores fictional and non-fictional representations of Ireland's relationship with England throughout the nineteenth century.",
    authors: ["Mary Jean Corbett"],
    date: "2000-01-01",

    tags: ["Irish history", "English literature", "union", "19th century"],    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1Lb9QwEB61uxe48KZLoVgc9tSsEj_itTggdukKpCIQYsvjEjmOU6qWpG3a_gH-ODOJs1pWQpw4Rh5Fssf-Zsbj-QZA8EkcbWCCtFYpJWxMDc3KVNoyVnluFdel4ImnBO9iaZZv5Pf36tsWZH1pTJsxDM8UJz1WrnKp58fORa1IE15cTrpqgFdFi9Cc_Bc-Pr-IqMsUZWNDy41tGKJZm-KJGM4-zpaf-h3IDQX4wSB3BFToIgkTilzRlgkuAm1P_y1D8pOIqOezD-0QBRmyZV68bZtTRCtEsqtmnb7hT-hPA3wv7sCvfuo0uclJ8XNVlr3BE_kfl-cuDD2VWtyDLV_dh8eH4eq0YWN2uGJ7bh7Ay9d0uVFTUM_qkqGbXFfspGLvEKB-MFsVLBQjsy9E0VQd7zNiBIsSRImHcLQ4-Dx_G4WmD5HVU8PTKLUm8bHzRijPkxLNJ5-ik5TYPC68Trh2xnipNRp3JR0O4VkojXSqcNrxgotHMKjqyu8Ak6oQiUWYcS6XrSuK-nK6kDaNbSmTEbxYU092c9YtVkY8YBgWU01uzEcwXmktc3mdde_idLap7BHsrwnWl-Fnfxd_3mssW9djdjCbd5p58k-JXbjVUQPQldBTGFxdXvtnMCDF78F2dPR1L2zw37G4CsA",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fassets.cambridge.org%2F97805211%2F20944%2Fcover%2F9780521120944.jpg"
  },
  {
    id: 34,
    title: "The Poetry of Fashion Design: A Celebration of the World's Most Interesting Fashion Designers",
    type: "eBook",


    category: "Design",
    description: "A beautifully illustrated exploration of creative expression in fashion, showcasing works by some of the world's most fascinating designers.",
    authors: ["Paz Diman"],
    date: "2011-01-01",

    tags: ["fashion", "design", "art", "aesthetics"],    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1LS8NAEB5si6AXXxWrteTkLSHJ7uZxEvsIXoQitqiXuMlmpaBJTduDd3-4O-mmaC-ehFwCC8lMNt_O65sBIK5lm1uYQDlnjBFu40Az6VEubZYknLm-JK6TYYI3moSTIX2-Y0878FJTY6qMoS5TtGqs3ORS569palZLFrri0lqzAa7FGqEr3qZ3Nf8wccwUpmP1zI0GtNS5FqhfotUf9yf3m7AMmvOBHSAFjIUuI74yMXRnqPpeoffuPCuVV1_8BvBAg3B0AF-1APiK1ky8b8jVW90e_1PIQ2hlyJg4gp0sP4b96Wyx4m_GTblcnEBXbUNjXGTL8tMopBHh6KYiN4ZV3UgbptHoYXBr6oEMJifoN5mB-ooudhNWD8SMKAZRWSiYFISGmaOMizD1iScVciR46lHJbCqE7QnllzEmySk08yLPzsCgTBCHKwhI04RWZqLyi1NfUO7ZXFKnA22t5LiSPXaV8aS8vQ4YtYrin4qLR_2BVsX530suYG8dHMarC81lucouoYm67kHDnD729Mb4Bv6R0Ck",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fimg.perlego.com%2Fbook-covers%2F2064619%2F9781610602303.jpg"
  },
  {
    id: 35,
    title: "A Wall of Our Own: An American History of the Berlin Wall",
    type: "eBook",

    category: "Research",
    description: "Explores the Berlin Wall as a powerful symbol in American cultural and political imagination, from its construction to its fall.",
    authors: ["Paul M. Farber"],
    date: "2020-01-01",
    tags: ["Berlin Wall", "Cold War", "American culture", "history"],

    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV3Nb9MwFLdYuawnGCDKAFkcJqQqkA87rZF2KGUTF7RLV01cIie2oWPLUN2C-O95z3bSpioSHLhErZ2kT36v78vPv0dIlr6Jox2dwKTknGcyxoZmJmfSxLwsJU9HJksTjRu855fi8gP7_AlzO03nw83Yf2U8jAHr8SDtPzC_fSkMwGcQAbiCEMB1xz9uv4bq46HbdQZf8GK9HF78rEMKsN2i8QAhv9oiAY97hQ-1PJXL0nMU6wdD3hSp1vY01B9iuqTjtg49lIfeziZA6IilaXnL_9nX3YoQv300DT2EOoUhPgYFVStyiHM8ovWuRgZ_TPgijHBfEovCOPI3FqitCxSIniYQ4p-L8QmCn9-qRbU61XW0tgfkAN4CKiuaXzUqgyP-Xh6i-2uH5gMaCREfD1u6rhpkr4ZOf4ISKXu7j64-6Uv7DUwMmJ-VbepUu7mxruUWwfrOHpD7Gs-oPCT3dH1EjkNQsbC39IR2TvzYI9KfL-xa3tDJcmUfETGhyGF6ZyiIBQWxeEcnNW2EggahwHkQCuqFwj3ymMzPz2bTj1HonhFJsEKxiJRJVSZBgUuIoMBtLUuuS8W0hgh7pCQzsFjYZA47OiaCjXOuNQN3Vo61UEap7Anp1Xe1fkoo4ypLJOjrqiqZ8-mTLK1Gisk8loYlA_Jqa8mKHzdup98WneX9801bTB-Q1265Cz8HISryqdjHpwGhWxwp9v8kbdjk50PFc3H2fponDk3x2d9QdUwON3-W56S3Wq71C9L7_qWqXjp5_A2hn36y",    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fmuse.jhu.edu%2Fbook%2F73260%2Fimage%2Ffront_cover.jpg%3Fformat%3D180"
  },
  {
    id: 36,
    title: "Blacks in Niagara Falls: Leaders and Community Development, 1850–1985",
    type: "eBook",

    category: "Management",
    description: "Blacks in Niagara Falls narrates and analyzes the history of Black Niagarans from the days of the Underground Railroad to the Age of Urban Renewal. Michael B. Boston highlights key figures and their roles in community building.",
    authors: ["Michael B. Boston"],
    date: "2021-01-01",
    tags: ["Black history", "Niagara Falls", "community development", "urban renewal"],
    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1Nb9NAEB1BeuGCoKQiLVQrDvRQjOz98NpIXFoS9UJPTUV7scbOOoqaulWcIvXfM_tRJ-4JDlwse1e2rDer2dnZt_MABP8aR898gkRUSgmMraBZnUqsY1WWqLiuBU-M3eCdTPPpD3n9U11t5NM2bf_V8NRGprcHaf_B-N1HqYHuaQjQlQYBXZ_Fx91j2KG1mTlHdj1f4BxXeDzB5dIR4Lyspi_OHA6IUCi-RR-yuNMMG0dJ7pVuPKGw7VPtg2BzSBlwlwP1Jxp9ynB6ftVjePjFpBVClxSOBK_cr0Ld77dlyW9ni2r93TTRQ_sSdjgtsy2jMrr81aW4KLqiF2xWCdsbctnkztctrTPuzWpp5nf92Y-HmeziDewYe87jLbwwzS4MfbmUR_aZ2Vq86PSOH3fhtVP4PGpZ4Fu-g7EHli0aFoBlDthvLMDKCFbWwcq2YP3COlCHcDkZX5yeRUGLIkIKMnkWoc4qrZCcsqRFMaaVTGaZERTBaq3rNBZuQ5rHdZ5lJuFlLtNS55hUtVJai1LswaC5a8x7YBXNEpjOZCkwl6hNPrORk6hiXWaJqNUIPm0BVvxeun3ztujZYATDgGPhe3mW2GKKI2BPqBbuvUDyLcYnp2lKf6_j_b_5_gG82gydDzBYrx7MRxjcz6vq0Jn5D8cLLVY",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97814384%2F9781438484631.jpg"
  },
  {
    id: 37,
    title: "The Star Gate Archives: Reports of the United States Government Sponsored Psi Program, 1972–1995. Volume 3: Psychokinesis",
    type: "eBook",

    category: "Research",
    description: "This volume presents declassified research conducted by the U.S. government on psychokinesis during the Cold War, examining claims and experiments under controlled conditions for intelligence applications.",
    authors: ["Edwin C. May", "Sonali Bhatt Marwaha"],
    date: "2019-01-01",

    tags: ["psychokinesis", "government research", "Cold War", "parapsychology"],    url: "https://pgcc.summon.serialssolutions.com/2.0.0/link/0/eLvHCXMwtV1LT9wwELbK9lJOfaq0pRpx4JJm5cR2HkhcoKBeVkKCRVUvK8ex2xWwi0go4t93JnGS3e2lPXCJHFuyJX-jeXkejIl4zMMNniC1VkoJzamhmUukdlwVhVZx6kQcWXrgPZ3m06_yx4R8O11nuWHuSYHHOYSeEmn_A_x-U5zAMZIAfpEI8LuhH_e_A_6oSd4F5B8LugKzbfybfyZwf2udK713g3MKnl1SfPpZNaeMAgrkIkiohxiFjqhxcNkwt0DQvi0vvaI4-vmgqZcPlFc4Dib6sc0N6n34540REBz90nVNOUMPun188sNVf0SUNY5O3lPQxMfplg3peqa2yu-GcP81UzaSKVpSqZIbhbGXvvNCsx6nuRL7VBT9ppyb-tAuwvtqi23hMrKy8PL74F6juvdcNKl8fmPRVfjqDtpm27q6QlmCcqau1oWx9IL14iV7bint5BV7ZhevGZzh4bedbHqEfaBq0Nc1eFZcvWHUcRAIYCCAoQP4ADy8sHSA8EILL7TwwgAv9PACwgse3i8wgAstuCAOYA3at2x6enJx_C30fTRCTQV2QxeVNk5UKTOudO5QLUrQpsoSbbhVuohl6aLMKlkYnheFMokoc1RbuI5SY1CnE-_YaLFc2PcMDAo4nZSyEDqXOrV5SUqfMDwtskg4tcP2Vq509vu6efKvZmsA7jDobnrWrPs45NnJ0bHMBRkdH_5ln4_sxUCAn9iovru3u2x0-9OYzw01_AGDlmUI",
    image: "https://pgcc.summon.serialssolutions.com/2.0.0/image/custom?url=https%3A%2F%2Fvle.dmmserver.com%2Fmedia%2F640%2F97814766%2F9781476627953.jpg"
  },
  {
    "id": 38,
    "title": "The Rise of the Machines – Why Automation is Different this Time",
    "type": "video",

    "category": "Management",
    "description": "This video explores the impact of automation on the workforce and how it differs from past technological advancements.",
    "author": "Kurzgesagt – In a Nutshell",
    "rating": null,
    "reviews": null,
    "date": "2017-04-13",

    "tags": ["automation", "technology", "economics", "future of work"],    "url": "https://www.youtube.com/watch?v=WSKi8HfcxEk",
    "image": "https://i.ytimg.com/vi/WSKi8HfcxEk/maxresdefault.jpg"
  },
  {
    "id": 39,
    "title": "The Infinite Hotel Paradox – Jeff Dekofsky",
    "type": "video",

    "category": "Technology",
    "description": "An animated explanation of the famous paradox that illustrates the concept of infinity in a hotel with an infinite number of rooms.",
    "author": "TED-Ed",
    "rating": null,
    "reviews": null,
    "date": "2014-03-17",

    "tags": ["mathematics", "infinity", "paradox", "TED-Ed"],    "url": "https://www.youtube.com/watch?v=Uj3_KqkI9Zo",
    "image": "https://i.ytimg.com/vi/Uj3_KqkI9Zo/maxresdefault.jpg"
  },
  {
    "id": 40,
    "title": "What is a Neural Network? | Deep learning, chapter 1",
    "type": "video",

    "category": "Technology",
    "description": "An introduction to neural networks and how they are used in deep learning applications.",
    "author": "3Blue1Brown",
    "rating": null,
    "reviews": null,
    "date": "2017-09-04",

    "tags": ["neural networks", "deep learning", "AI", "machine learning"],    "url": "https://www.youtube.com/watch?v=aircAruvnKk",
    "image": "https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg"
  },
  {
    "id": 41,
    "title": "How to Speak so that People Want to Listen | Julian Treasure",
    "type": "video",

    "category": "Management",
    "description": "Julian Treasure offers tips on how to speak powerfully to make people want to listen.",
    "author": "TED",
    "rating": null,
    "reviews": null,
    "date": "2014-06-27",
    "tags": ["communication", "public speaking", "TED Talk", "listening"],
    "url": "https://www.youtube.com/watch?v=eIho2S0ZahI",
    "image": "https://i.ytimg.com/vi/eIho2S0ZahI/maxresdefault.jpg"
  },
  {
    "id": 42,
    "title": "The surprising habits of original thinkers | Adam Grant",
    "type": "video",

    "category": "Study",
    "description": "Organizational psychologist Adam Grant explores the habits of original thinkers and how they come up with creative ideas.",
    "author": "TED",
    "rating": null,
    "reviews": null,
    "date": "2016-02-01",

    "tags": ["creativity", "original thinking", "psychology", "TED Talk"],    "url": "https://www.youtube.com/watch?v=fxbCHn6gE3U",
    "image": "https://i.ytimg.com/vi/fxbCHn6gE3U/maxresdefault.jpg"
  }

];


// List of resource categories
const resourceCategories = [
  "Time Management",
  "Study",
  "Wellness",
  "Technology",
  "Research",
  "Theology",
  "Management",
  "Medical"
];

// Resource types
const resourceTypes = ["article", "video", "pdf", "tool", "template"];

export { resourcesData, resourceCategories, resourceTypes };
export default resourcesData;