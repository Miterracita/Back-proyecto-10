const events = [
    {
      name: "Festival de Música",
      date: "2024-08-15",
      time: "18:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666941/cld-sample-3.jpg",
      location: "Parque Central, Ciudad",
      description: "Disfruta de una noche llena de música en vivo con artistas locales e internacionales. Este festival promete una experiencia inolvidable con una mezcla de géneros musicales, desde pop y rock hasta música clásica y electrónica. Además de la música, habrá puestos de comida, áreas de descanso y actividades interactivas para todas las edades. No te pierdas la oportunidad de vivir una noche mágica bajo las estrellas, rodeado de buena música y en compañía de amigos y familiares. ¡Te esperamos!"
    },
    {
      name: "Carrera de 5K",
      date: "2024-08-22",
      time: "07:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666940/cld-sample.jpg",
      location: "Avenida Principal, Ciudad",
      description: "Únete a nosotros en una carrera para apoyar a las comunidades locales. La carrera de 5K es una excelente oportunidad para poner a prueba tu resistencia y disfrutar de un recorrido pintoresco por la ciudad. Todos los fondos recaudados se destinarán a proyectos comunitarios. Al finalizar la carrera, habrá una ceremonia de premiación, sorteos y actividades recreativas para los participantes y sus familias. No importa tu nivel de habilidad, lo importante es participar y contribuir a una buena causa. ¡Corre con nosotros!"
    },
    {
      name: "Concierto de Rock",
      date: "2024-08-30",
      time: "20:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666941/cld-sample-3.jpg",
      location: "Estadio Municipal, Ciudad",
      description: "Vive la emoción del rock con las mejores bandas del momento. Prepárate para una noche de adrenalina y energía con actuaciones electrizantes. El escenario estará equipado con tecnología de última generación para garantizar una experiencia sonora y visual única. Habrá zonas de comida, merchandising exclusivo y áreas VIP para los aficionados más apasionados. Este evento es una celebración de la música rock en todas sus formas, desde el clásico hasta el metal. ¡No te lo puedes perder!"
    },
    {
      name: "Taller de Fotografía",
      date: "2024-09-15",
      time: "14:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666940/cld-sample.jpg",
      location: "Casa de la Cultura, Ciudad",
      description: "Aprende técnicas de fotografía con expertos del campo. Este taller está diseñado para todos los niveles, desde principiantes hasta avanzados. Los instructores compartirán sus conocimientos sobre composición, iluminación, edición y más. Además, habrá sesiones prácticas y una revisión de portafolios. Al final del taller, podrás exhibir tus mejores trabajos en una exposición abierta al público. No pierdas la oportunidad de mejorar tus habilidades y conectar con otros entusiastas de la fotografía. ¡Inscríbete ya!"
    },
    {
      name: "Exposición de Arte Contemporáneo",
      date: "2024-09-01",
      time: "10:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666941/cld-sample-3.jpg",
      location: "Museo de Arte Moderno, Ciudad",
      description: "Una exposición de las obras más recientes de artistas contemporáneos."
    },
    {
      name: "Festival Gastronómico",
      date: "2024-08-25",
      time: "12:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666940/cld-sample.jpg",
      location: "Plaza Mayor, Ciudad",
      description: "Degusta una variedad de platos de diferentes culturas y regiones."
    },
    {
      name: "Feria del Libro",
      date: "2024-08-05",
      time: "11:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666940/cld-sample.jpg",
      location: "Plaza de la Cultura, Ciudad",
      description: "Descubre nuevos libros y conoce a tus autores favoritos en la feria anual."
    },
    {
      name: "Noche de Jazz",
      date: "2024-07-20",
      time: "19:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666940/cld-sample.jpg",
      location: "Teatro al Aire Libre, Ciudad",
      description: "Una velada de jazz bajo las estrellas con músicos reconocidos."
    },
    {
      name: "Fiesta de la Cerveza",
      date: "2024-08-12",
      time: "16:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666940/cld-sample.jpg",
      location: "Parque del Lago, Ciudad",
      description: "Prueba las mejores cervezas artesanales de la región."
    },
    {
      name: "Festival de Cine al Aire Libre",
      date: "2024-07-25",
      time: "21:00",
      img: "https://res.cloudinary.com/dq2daoeex/image/upload/v1715666940/cld-sample.jpg",
      location: "Plaza Central, Ciudad",
      description: "Proyecciones de películas clásicas y contemporáneas en un ambiente único."
    }
  ];

  module.exports = events;