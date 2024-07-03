export const pageSize = {
  TEN: "TEN",
  FIFTEEN: "FIFTEEN",
  TWENTY: " TWENTY"
}

export const order = {
  ASC: "ASC",
  DESC: "DESC"
}


export type FormState = {
  message: string;
};


export const member = [
  {
      name: "Hor KimHouy",
      position: "Team Leader",
      image: "/kimhouy.jpg",
  },
  {
      name: "Hout Rithy",
      position: "Backup Leader",
      image: "/rithy.jpg",
  },
  {
      name: "Vorn Navatra",
      position: "Team Member",
      image: "/navatra.jpg",
  },
  {
      name: "Oem YongSinh",
      position: "Team Member",
      image: "/sinh.jpg",
  },
  {
      name: "Heng KeaHak",
      position: "Team Member",
      image: "/keahak.jpg",
  },
  {
      name: "Um Sethey",
      position: "Team Member",
      image: "/sethey.jpg",
  },{
      name: "Ol Eevin",
      position: "Team Member",
      image: "/eevin.jpg",
  }
]

export const roleMember = [
  {
      title: "Backend Development",
      team : [
          {
              name: "Hor KimHouy",
              position: "Backend Developer",
              image: "/kimhouy.jpg",
          },
          {
              name: "Hout Rithy",
              position: "Backend Support",
              image: "/rithy.jpg",
          },
      ]
  },
  {
      title: "Frontend Development",
      team : [
          {
              name: "Hout Rithy",
              position: "Frontend Developer",
              image: "/rithy.jpg",
          },
          {
              name: "Hor KimHouy",
              position: "Frontend Support",
              image: "/kimhouy.jpg",
          },
      ]
  },
  {
      title: "Testing",
      team : [
          {
              name: "Vorn Navatra",
              position: "API Tester",
              image: "/navatra.jpg",
          },
          {
              name: "Ol Eevin",
              position: "API Tester",
              image: "/eevin.jpg",
          },
          {
              name: "Oem YongSinh",
              position: "Documentation Specialist",
              image: "/sinh.jpg",
          },
      ]
  },
  {
      title: "Presentation",
      team : [
          {
              name: "Heng KeaHak",
              position: "PowerPoint Designer",
              image: "/keahak.jpg",
          },
          {
              name: "Um Sethey",
              position: "PowerPoint Designer",
              image: "/sethey.jpg",
          },
      ]
  },
]
