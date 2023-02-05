const images = [
    {
      id:1,
      title: 'hmac',
      about: 'fashion',
      destination:"https://i.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
      category_id:1,
      posted_by:"Jafer", // I will convert it to the value of user_id but in the future
      save : "Jafer",
      create:"jafer Aldkly",
      image: 'https://i.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4',
    },
    {
      id:2,
      title: 'walking',
      about: 'fashion',
      destination:"https://i.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      category_id:1,
      posted_by:"Mohammed", // I will convert it to the value of user_id but in the future
      save : "Mohammed",
      create:"Mohammed",
      image: 'https://i.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0',
    },
    {
      id:3,
      title: 'summer',
      about: 'seasons',
      destination:"https://i.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8",
      category_id:2,
      posted_by:"Mohammed", // I will convert it to the value of user_id but in the future
      save : "Mohammed",
      create:"Mohammed",
      image: 'https://i.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
    },
    {
      id:4,
      title: 'sea',
      about: 'water',
      destination:"https://i.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
      category_id:2,
      posted_by:"Mohammed", // I will convert it to the value of user_id but in the future
      save : "Mohammed",
      create:"Mohammed",
      image: 'https://i.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE',
    },
    {
      id:5,
      title: 'dark sea',
      about: 'water',
      destination:"https://i.picsum.photos/id/14/2500/1667.jpg?hmac=ssQyTcZRRumHXVbQAVlXTx-MGBxm6NHWD3SryQ48G-o",
      category_id:2,
      posted_by:"Mohammed", // I will convert it to the value of user_id but in the future
      save : "Mohammed",
      create:"Mohammed",
      image: 'https://i.picsum.photos/id/14/2500/1667.jpg?hmac=ssQyTcZRRumHXVbQAVlXTx-MGBxm6NHWD3SryQ48G-o',
    },
    {
      id:6,
      title: 'piece',
      about: 'brain storming',
      destination:"https://i.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w",
      category_id:2,
      posted_by:"Mohammed", // I will convert it to the value of user_id but in the future
      save : "Mohammed",
      create:"Mohammed",
      image: 'https://i.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w',
    },
    {
      id:7,
      title: 'forest',
      about: 'forest & seasons',
      destination:"https://i.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w",
      category_id:3,
      posted_by:"Morad", // I will convert it to the value of user_id but in the future
      save : "Morad",
      image: 'https://i.picsum.photos/id/15/2500/1667.jpg?hmac=Lv03D1Y3AsZ9L2tMMC1KQZekBVaQSDc1waqJ54IHvo4',
    },
    {
      id:8,
      title: 'computer',
      about: 'computer & information',
      destination:"https://i.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc",
      category_id:3,
      posted_by:"Morad", // I will convert it to the value of user_id but in the future
      save : "Morad",
      image: 'https://i.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc',
    },
    {
      id:9,
      title: 'notes',
      about: 'computer & information',
      destination:"https://i.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc",
      category_id:3,
      posted_by:"Morad", // I will convert it to the value of user_id but in the future
      save : "Morad",
      image: 'https://i.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc',
    },
    {
      id:10,
      title: 'hunting',
      about: 'Fetch',
      destination:"https://i.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
      category_id:3,
      posted_by:"Morad", // I will convert it to the value of user_id but in the future
      save : "Morad",
      image: 'https://i.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g',
    },
    {
      id:11,
      title: 'flowers',
      about: 'flowers & seasons',
      destination:"https://i.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
      category_id:3,
      posted_by:"Morad", // I will convert it to the value of user_id but in the future
      create:"Morad",
      image: 'https://i.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM',
    },
    {
      id:12,
      title: 'equipments',
      about: 'equipments & success',
      destination:"https://i.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
      category_id:4,
      posted_by:"Morad", // I will convert it to the value of user_id but in the future
      create:"Morad",
      image: 'https://i.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI',
    },
    {
      id:13,
      title: 'groups',
      about: 'groups & togather',
      destination:"ttps://i.picsum.photos/id/23/3887/4899.jpg?hmac=2fo1Y0AgEkeL2juaEBqKPbnEKm_5Mp0M2nuaVERE6eE",
      category_id:4,
      posted_by:"Morad", // I will convert it to the value of user_id but in the future
      create:"Morad",
      image: 'https://i.picsum.photos/id/23/3887/4899.jpg?hmac=2fo1Y0AgEkeL2juaEBqKPbnEKm_5Mp0M2nuaVERE6eE',
    },
  ];
  

  export default images;