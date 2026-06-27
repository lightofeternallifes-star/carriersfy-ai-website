(function () {
  'use strict';

  window.CF_INDUSTRIES = [
    // ── Healthcare ──────────────────────────────────────────────────────────
    {
      id: 'dental-clinics',
      icon: '🦷',
      name: { en: 'Dental Clinics', es: 'Clínicas Dentales', pt: 'Clínicas Dentárias' },
      description: { en: 'Dental offices and orthodontic practices.', es: 'Consultorios dentales y ortodoncia.', pt: 'Consultórios dentários e ortodontia.' }
    },
    {
      id: 'dental-labs',
      icon: '🔬',
      name: { en: 'Dental Labs', es: 'Laboratorios Dentales', pt: 'Laboratórios Dentários' },
      description: { en: 'Prosthetics labs and dental device manufacturing.', es: 'Laboratorios de prótesis y fabricación dental.', pt: 'Laboratórios de próteses e dispositivos dentários.' }
    },
    {
      id: 'medical',
      icon: '🏥',
      name: { en: 'Medical Practices', es: 'Consultorios Médicos', pt: 'Clínicas Médicas' },
      description: { en: 'Clinics, specialists and primary care offices.', es: 'Clínicas, especialistas y atención primaria.', pt: 'Clínicas, especialistas e atenção primária.' }
    },
    {
      id: 'veterinary',
      icon: '🐾',
      name: { en: 'Veterinary Clinics', es: 'Clínicas Veterinarias', pt: 'Clínicas Veterinárias' },
      description: { en: 'Animal hospitals, vets and grooming clinics.', es: 'Hospitales veterinarios y cuidado animal.', pt: 'Hospitais veterinários e cuidados com animais.' }
    },
    // ── Legal & Financial ────────────────────────────────────────────────────
    {
      id: 'lawfirm',
      icon: '⚖️',
      name: { en: 'Law Firms', es: 'Firmas de Abogados', pt: 'Escritórios de Advocacia' },
      description: { en: 'Attorneys, legal offices and practice groups.', es: 'Abogados, bufetes y grupos de práctica legal.', pt: 'Advogados, escritórios e grupos jurídicos.' }
    },
    {
      id: 'immigration',
      icon: '🛂',
      name: { en: 'Immigration Services', es: 'Servicios de Inmigración', pt: 'Serviços de Imigração' },
      description: { en: 'Visa, residency and immigration consulting.', es: 'Visa, residencia y consultoría migratoria.', pt: 'Visto, residência e consultoria migratória.' }
    },
    {
      id: 'tax',
      icon: '📋',
      name: { en: 'Tax Offices', es: 'Oficinas de Impuestos', pt: 'Escritórios de Contabilidade Fiscal' },
      description: { en: 'Tax prep, filing and financial compliance.', es: 'Declaraciones, trámites fiscales y cumplimiento.', pt: 'Declarações, obrigações fiscais e conformidade.' }
    },
    {
      id: 'insurance',
      icon: '🛡',
      name: { en: 'Insurance Agencies', es: 'Agencias de Seguros', pt: 'Seguradoras' },
      description: { en: 'Property, life and commercial insurance.', es: 'Seguros de propiedad, vida y comerciales.', pt: 'Seguros de propriedade, vida e comerciais.' }
    },
    {
      id: 'accounting',
      icon: '📊',
      name: { en: 'Accounting Firms', es: 'Contadurías', pt: 'Contabilidades' },
      description: { en: 'Bookkeeping, CPA and financial advisory.', es: 'Contabilidad, CPA y asesoría financiera.', pt: 'Contabilidade, CPA e assessoria financeira.' }
    },
    // ── Real Estate ──────────────────────────────────────────────────────────
    {
      id: 'realtors',
      icon: '🏡',
      name: { en: 'Real Estate', es: 'Bienes Raíces', pt: 'Imóveis' },
      description: { en: 'Realtors, buyer agents and property sales.', es: 'Agentes inmobiliarios y venta de propiedades.', pt: 'Corretores e venda de imóveis.' }
    },
    {
      id: 'property-mgmt',
      icon: '🏢',
      name: { en: 'Property Management', es: 'Administración de Propiedades', pt: 'Administração de Imóveis' },
      description: { en: 'Rental management and tenant services.', es: 'Gestión de alquileres y servicios a inquilinos.', pt: 'Gestão de aluguéis e serviços a locatários.' }
    },
    {
      id: 'lenders',
      icon: '💰',
      name: { en: 'Mortgage Lenders', es: 'Financiadoras Hipotecarias', pt: 'Financiadoras de Imóveis' },
      description: { en: 'Home loans, refinancing and mortgage advice.', es: 'Préstamos hipotecarios y refinanciamiento.', pt: 'Empréstimos hipotecários e refinanciamento.' }
    },
    // ── Food & Beverage ──────────────────────────────────────────────────────
    {
      id: 'restaurant',
      icon: '🍽',
      name: { en: 'Restaurants', es: 'Restaurantes', pt: 'Restaurantes' },
      description: { en: 'Dine-in, takeout and catering businesses.', es: 'Restaurantes, para llevar y catering.', pt: 'Restaurantes, delivery e catering.' }
    },
    {
      id: 'cafe',
      icon: '☕',
      name: { en: 'Coffee Shops', es: 'Cafeterías', pt: 'Cafés' },
      description: { en: 'Cafés, bakeries and beverage retailers.', es: 'Cafeterías, panaderías y bebidas.', pt: 'Cafés, padarias e bebidas.' }
    },
    // ── Beauty & Grooming ────────────────────────────────────────────────────
    {
      id: 'barbershop',
      icon: '💈',
      name: { en: 'Barbershops', es: 'Barberías', pt: 'Barbearias' },
      description: { en: "Men's cuts, grooming and beard services.", es: 'Cortes masculinos, arreglo y barba.', pt: 'Cortes masculinos, barba e cuidados.' }
    },
    {
      id: 'beauty-salon',
      icon: '💅',
      name: { en: 'Beauty Salons', es: 'Salones de Belleza', pt: 'Salões de Beleza' },
      description: { en: 'Hair, nails, waxing and spa services.', es: 'Cabello, uñas, depilación y spa.', pt: 'Cabelo, unhas, depilação e spa.' }
    },
    {
      id: 'dog-grooming-mobile',
      icon: '🚐',
      name: { en: 'Mobile Dog Grooming', es: 'Grooming Canino Móvil', pt: 'Banho e Tosa Móvel' },
      description: { en: 'Mobile pet bathing and grooming services.', es: 'Baño y estética para mascotas a domicilio.', pt: 'Banho e tosa a domicílio para pets.' }
    },
    {
      id: 'pet-grooming',
      icon: '🐩',
      name: { en: 'Pet Grooming', es: 'Grooming de Mascotas', pt: 'Pet Shop e Banho e Tosa' },
      description: { en: 'In-store pet grooming, boarding and care.', es: 'Peluquería, hospedaje y cuidado de mascotas.', pt: 'Banho, tosa, hospedagem e cuidados para pets.' }
    },
    // ── Cleaning ─────────────────────────────────────────────────────────────
    {
      id: 'cleaning-com',
      icon: '🏢',
      name: { en: 'Commercial Cleaning', es: 'Limpieza Comercial', pt: 'Limpeza Comercial' },
      description: { en: 'Office and commercial space cleaning.', es: 'Limpieza de oficinas y espacios comerciales.', pt: 'Limpeza de escritórios e espaços comerciais.' }
    },
    {
      id: 'cleaning-res',
      icon: '🏠',
      name: { en: 'Residential Cleaning', es: 'Limpieza Residencial', pt: 'Limpeza Residencial' },
      description: { en: 'Home cleaning and housekeeping services.', es: 'Limpieza del hogar y empleadas domésticas.', pt: 'Limpeza doméstica e diaristas.' }
    },
    // ── Home Services & Trades ───────────────────────────────────────────────
    {
      id: 'hvac',
      icon: '❄️',
      name: { en: 'HVAC Companies', es: 'Empresas de A/C y Clima', pt: 'Empresas de Ar-condicionado' },
      description: { en: 'Heating, cooling and ventilation services.', es: 'Calefacción, refrigeración y ventilación.', pt: 'Aquecimento, refrigeração e ventilação.' }
    },
    {
      id: 'electrician',
      icon: '⚡',
      name: { en: 'Electricians', es: 'Electricistas', pt: 'Eletricistas' },
      description: { en: 'Residential and commercial electrical work.', es: 'Trabajos eléctricos residenciales y comerciales.', pt: 'Serviços elétricos residenciais e comerciais.' }
    },
    {
      id: 'plumbing',
      icon: '🚰',
      name: { en: 'Plumbers', es: 'Plomeros', pt: 'Encanadores' },
      description: { en: 'Pipe repair, install and inspection.', es: 'Reparación de tuberías, instalación e inspección.', pt: 'Reparo, instalação e inspeção de encanamentos.' }
    },
    {
      id: 'roofing',
      icon: '🏗',
      name: { en: 'Roofing Companies', es: 'Empresas de Techos', pt: 'Empresas de Telhado' },
      description: { en: 'Roof install, repair and inspections.', es: 'Instalación, reparación e inspección de techos.', pt: 'Instalação, reparo e inspeção de telhados.' }
    },
    {
      id: 'landscaping',
      icon: '🌿',
      name: { en: 'Landscaping', es: 'Paisajismo', pt: 'Paisagismo' },
      description: { en: 'Lawn care, gardening and outdoor services.', es: 'Cuidado del césped, jardinería y exteriores.', pt: 'Cuidado de gramados, jardinagem e externos.' }
    },
    {
      id: 'pressure-washing',
      icon: '💦',
      name: { en: 'Pressure Washing', es: 'Lavado a Presión', pt: 'Lavagem a Pressão' },
      description: { en: 'Exterior cleaning for homes and businesses.', es: 'Limpieza exterior de hogares y negocios.', pt: 'Limpeza externa de residências e empresas.' }
    },
    {
      id: 'pest-control',
      icon: '🐛',
      name: { en: 'Pest Control', es: 'Control de Plagas', pt: 'Controle de Pragas' },
      description: { en: 'Extermination, prevention and inspection.', es: 'Exterminio, prevención e inspección de plagas.', pt: 'Dedetização, prevenção e inspeção de pragas.' }
    },
    // ── Automotive ───────────────────────────────────────────────────────────
    {
      id: 'auto-repair',
      icon: '🔧',
      name: { en: 'Auto Repair', es: 'Talleres Mecánicos', pt: 'Oficinas Mecânicas' },
      description: { en: 'Mechanical repair and vehicle maintenance.', es: 'Reparación mecánica y mantenimiento vehicular.', pt: 'Reparo mecânico e manutenção de veículos.' }
    },
    {
      id: 'auto-dealer',
      icon: '🚗',
      name: { en: 'Auto Dealerships', es: 'Concesionarias de Autos', pt: 'Concessionárias de Veículos' },
      description: { en: 'New and used car sales and financing.', es: 'Venta de autos nuevos, usados y financiamiento.', pt: 'Venda de carros novos, usados e financiamento.' }
    },
    {
      id: 'car-wash',
      icon: '🚿',
      name: { en: 'Car Wash', es: 'Lavado de Autos', pt: 'Lava-Jato' },
      description: { en: 'Automated and hand car wash services.', es: 'Lavado automático y manual de vehículos.', pt: 'Lavagem automática e manual de veículos.' }
    },
    {
      id: 'truck-parts',
      icon: '🔩',
      name: { en: 'Truck Parts', es: 'Refacciones para Camión', pt: 'Peças para Caminhão' },
      description: { en: 'Heavy-duty truck and fleet parts supply.', es: 'Repuestos para camiones pesados y flotillas.', pt: 'Peças para caminhões pesados e frotas.' }
    },
    // ── Transportation & Logistics ───────────────────────────────────────────
    {
      id: 'trucking',
      icon: '🚛',
      name: { en: 'Transportation', es: 'Transporte', pt: 'Transportadoras' },
      description: { en: 'Freight, hauling and cargo services.', es: 'Carga, acarreo y servicios de transporte.', pt: 'Frete, acarreto e serviços de transporte.' }
    },
    {
      id: 'logistics',
      icon: '📦',
      name: { en: 'Logistics', es: 'Logística', pt: 'Logística' },
      description: { en: 'Supply chain, warehousing and distribution.', es: 'Cadena de suministro, almacén y distribución.', pt: 'Cadeia de suprimentos, armazenagem e distribuição.' }
    },
    // ── Printing & Marketing ─────────────────────────────────────────────────
    {
      id: 'signs-print',
      icon: '🖨',
      name: { en: 'Printing & Sign Shops', es: 'Imprentas y Letreros', pt: 'Gráficas e Sinalização' },
      description: { en: 'Signs, banners and commercial printing.', es: 'Letreros, banners e impresión comercial.', pt: 'Placas, banners e impressão comercial.' }
    },
    {
      id: 'marketing',
      icon: '📈',
      name: { en: 'Marketing Agencies', es: 'Agencias de Marketing', pt: 'Agências de Marketing' },
      description: { en: 'Digital, advertising and creative agencies.', es: 'Agencias digitales, publicidad y creativas.', pt: 'Agências digitais, publicidade e criativas.' }
    },
    // ── Industrial ───────────────────────────────────────────────────────────
    {
      id: 'construction',
      icon: '🏗',
      name: { en: 'Construction', es: 'Construcción', pt: 'Construção' },
      description: { en: 'General contractors and construction firms.', es: 'Contratistas generales y empresas constructoras.', pt: 'Empreiteiras e construtoras.' }
    },
    {
      id: 'manufacturing',
      icon: '🏭',
      name: { en: 'Manufacturing', es: 'Manufactura', pt: 'Manufatura' },
      description: { en: 'Production, assembly and fabrication plants.', es: 'Producción, ensamblado y plantas de fabricación.', pt: 'Produção, montagem e fabricação.' }
    },
    // ── Security ─────────────────────────────────────────────────────────────
    {
      id: 'security',
      icon: '🔒',
      name: { en: 'Security Companies', es: 'Empresas de Seguridad', pt: 'Empresas de Segurança' },
      description: { en: 'Guard services, surveillance and alarms.', es: 'Vigilancia, CCTV y sistemas de alarma.', pt: 'Vigilância, CCTV e sistemas de alarme.' }
    },
    // ── Fitness & Wellness ───────────────────────────────────────────────────
    {
      id: 'fitness',
      icon: '💪',
      name: { en: 'Fitness Centers', es: 'Gimnasios', pt: 'Academias' },
      description: { en: 'Gyms, personal training and wellness studios.', es: 'Gimnasios, entrenamiento personal y bienestar.', pt: 'Academias, personal training e bem-estar.' }
    },
    // ── Retail & E-Commerce ──────────────────────────────────────────────────
    {
      id: 'retail',
      icon: '🏬',
      name: { en: 'Retail Stores', es: 'Tiendas Minoristas', pt: 'Lojas de Varejo' },
      description: { en: 'Physical retail and point-of-sale businesses.', es: 'Tiendas físicas y puntos de venta.', pt: 'Comércio físico e lojas de varejo.' }
    },
    {
      id: 'ecommerce',
      icon: '🛒',
      name: { en: 'E-Commerce', es: 'E-Commerce', pt: 'E-Commerce' },
      description: { en: 'Online stores, dropshipping and digital sales.', es: 'Tiendas en línea, dropshipping y ventas digitales.', pt: 'Lojas online, dropshipping e vendas digitais.' }
    },
  ];
})();
