/**
 * JTEKT Industrial B2B Seed Script
 * Seeds JTEKT categories and industrial products (bearings, steering, driveline).
 * Run after main seed: yarn seed:jtekt
 * Idempotent: re-running will skip existing categories/collection/products.
 */
import {
  createCollectionsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
} from "@medusajs/core-flows";
import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  IProductModuleService,
  ISalesChannelModuleService,
} from "@medusajs/framework/types";

const JTEKT_CATEGORY_NAMES = [
  "Industrial Bearings",
  "Automotive Bearings",
  "Steering Systems",
  "Driveline",
  "Machine Tools",
  "Aftermarket",
];

const JTEKT_IMAGES = {
  bearing:
    "https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png",
  steering:
    "https://medusa-public-images.s3.eu-west-1.amazonaws.com/camera-front.png",
  driveline:
    "https://medusa-public-images.s3.eu-west-1.amazonaws.com/headphone-front.png",
};

export default async function seedJtektIndustrial({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService: ISalesChannelModuleService =
    container.resolve(ModuleRegistrationName.SALES_CHANNEL);
  const productModuleService: IProductModuleService = container.resolve(
    ModuleRegistrationName.PRODUCT
  );

  const [defaultSalesChannel] =
    await salesChannelModuleService.listSalesChannels({
      name: "Default Sales Channel",
    });

  if (!defaultSalesChannel) {
    logger.warn("Default Sales Channel not found. Run main seed first.");
    return;
  }

  logger.info("Seeding JTEKT industrial categories...");

  const jtektHandles = JTEKT_CATEGORY_NAMES.map((n) =>
    n.toLowerCase().replace(/\s+/g, "-")
  );
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const { data: allCategories = [] } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
    filters: { handle: jtektHandles },
  });
  const existingByNames = new Map(
    (allCategories as { id: string; name: string }[]).map((c) => [c.name, c])
  );
  const toCreate = JTEKT_CATEGORY_NAMES.filter((n) => !existingByNames.has(n));

  if (toCreate.length > 0) {
    try {
      const { result: created } =
        await createProductCategoriesWorkflow(container).run({
          input: {
            product_categories: toCreate.map((name) => ({
              name,
              is_active: true,
            })),
          },
        });
      for (const c of created) {
        existingByNames.set(c.name, c);
      }
    } catch (err: unknown) {
      const msg = (err as Error)?.message ?? "";
      if (msg.includes("already exists")) {
        const { data: refreshed = [] } = await query.graph({
          entity: "product_category",
          fields: ["id", "name", "handle"],
          filters: { handle: jtektHandles },
        });
        (refreshed as { id: string; name: string }[]).forEach((c) =>
          existingByNames.set(c.name, c)
        );
      } else {
        throw err;
      }
    }
  }

  const jtektCategories = JTEKT_CATEGORY_NAMES.map(
    (n) => existingByNames.get(n)
  ).filter((c): c is NonNullable<typeof c> => c != null);

  if (jtektCategories.length !== JTEKT_CATEGORY_NAMES.length) {
    const missing = JTEKT_CATEGORY_NAMES.filter(
      (n) => !existingByNames.has(n)
    );
    throw new Error(
      `Missing JTEKT categories: ${missing.join(", ")}. Found: ${Array.from(existingByNames.keys()).join(", ")}`
    );
  }

  const getCatId = (name: string) =>
    jtektCategories.find((c) => c.name === name)?.id ?? "";

  logger.info("Creating JTEKT Industrial collection...");

  const [existingCollections] =
    await productModuleService.listAndCountProductCollections({
      handle: "jtekt-industrial",
    });
  let jtektCollection = existingCollections[0];
  if (!jtektCollection) {
    const {
      result: [created],
    } = await createCollectionsWorkflow(container).run({
      input: {
        collections: [
          { title: "JTEKT Industrial", handle: "jtekt-industrial" },
        ],
      },
    });
    jtektCollection = created;
  }

  logger.info("Seeding JTEKT industrial products...");

  const industrialProducts = [
    // Industrial Bearings
    {
      title: "Koyo Deep Groove Ball Bearing 6205-2RS",
      handle: "koyo-bearing-6205-2rs",
      description:
        "Sealed deep groove ball bearing for industrial applications. High load capacity, suitable for motors, pumps, and conveyors.",
      category_ids: [getCatId("Industrial Bearings")],
      metadata: {
        oem_reference: "6205-2RS",
        brand: "Koyo",
        id_dim: "25",
        od_dim: "52",
        width_dim: "15",
        load_capacity_kn: "14.3",
        application: "Bearings",
      },
      sku: "KOYO-6205-2RS",
      price: 1249,
      image: JTEKT_IMAGES.bearing,
    },
    {
      title: "JTEKT Tapered Roller Bearing LM501349/LM501310",
      handle: "jtekt-tapered-bearing-lm501349",
      description:
        "Tapered roller bearing for automotive and industrial driveline applications. Matched set for optimal performance.",
      category_ids: [getCatId("Industrial Bearings")],
      metadata: {
        oem_reference: "LM501349/LM501310",
        brand: "JTEKT",
        id_dim: "38.1",
        od_dim: "72.233",
        width_dim: "22.225",
        load_capacity_kn: "65.2",
        application: "Bearings",
      },
      sku: "JTEKT-LM501349",
      price: 4599,
      image: JTEKT_IMAGES.bearing,
    },
    {
      title: "Koyo Cylindrical Roller Bearing NU206",
      handle: "koyo-cylindrical-nu206",
      description:
        "Cylindrical roller bearing for high radial loads. Suitable for machine tools and gearboxes.",
      category_ids: [getCatId("Industrial Bearings")],
      metadata: {
        oem_reference: "NU206",
        brand: "Koyo",
        id_dim: "30",
        od_dim: "62",
        width_dim: "16",
        load_capacity_kn: "22.5",
        application: "Bearings",
      },
      sku: "KOYO-NU206",
      price: 1899,
      image: JTEKT_IMAGES.bearing,
    },
    {
      title: "Toyoda Angular Contact Bearing 7206B",
      handle: "toyoda-angular-7206b",
      description:
        "Angular contact ball bearing for precision applications. High-speed capable.",
      category_ids: [getCatId("Industrial Bearings")],
      metadata: {
        oem_reference: "7206B",
        brand: "Toyoda",
        id_dim: "30",
        od_dim: "62",
        width_dim: "16",
        load_capacity_kn: "18.5",
        application: "Bearings",
      },
      sku: "TOYODA-7206B",
      price: 2299,
      image: JTEKT_IMAGES.bearing,
    },
    // Automotive Bearings
    {
      title: "JTEKT Wheel Hub Bearing Unit HB-4521",
      handle: "jtekt-wheel-hub-hb4521",
      description:
        "Integrated wheel hub bearing unit for passenger vehicles. OE quality for replacement applications.",
      category_ids: [getCatId("Automotive Bearings")],
      metadata: {
        oem_reference: "HB-4521",
        brand: "JTEKT",
        application: "Bearings",
        vehicle_compatibility: "Compact/Mid-size sedans",
      },
      sku: "JTEKT-HB4521",
      price: 7899,
      image: JTEKT_IMAGES.bearing,
    },
    {
      title: "Koyo Clutch Release Bearing 6203",
      handle: "koyo-clutch-bearing-6203",
      description:
        "Clutch release bearing for manual transmission systems. OEM specification.",
      category_ids: [getCatId("Automotive Bearings")],
      metadata: {
        oem_reference: "6203",
        brand: "Koyo",
        id_dim: "17",
        od_dim: "40",
        width_dim: "12",
        application: "Bearings",
      },
      sku: "KOYO-CL-6203",
      price: 2499,
      image: JTEKT_IMAGES.bearing,
    },
    // Steering Systems
    {
      title: "JTEKT Electric Power Steering Motor EPS-12",
      handle: "jtekt-eps-motor-12",
      description:
        "Electric power steering assist motor for column-assist EPS systems. 12V compatible.",
      category_ids: [getCatId("Steering Systems")],
      metadata: {
        oem_reference: "EPS-12",
        brand: "JTEKT",
        application: "Steering",
      },
      sku: "JTEKT-EPS12",
      price: 12499,
      image: JTEKT_IMAGES.steering,
    },
    {
      title: "JTEKT Rack and Pinion Steering Gear 4R-280",
      handle: "jtekt-rack-pinion-4r280",
      description:
        "Rack and pinion steering gear assembly. Replacement for OE applications.",
      category_ids: [getCatId("Steering Systems")],
      metadata: {
        oem_reference: "4R-280",
        brand: "JTEKT",
        application: "Steering",
      },
      sku: "JTEKT-4R280",
      price: 18999,
      image: JTEKT_IMAGES.steering,
    },
    {
      title: "FujiKiko Steering Column Bearing",
      handle: "fujikiko-column-bearing",
      description:
        "Steering column support bearing for tilt and telescopic columns.",
      category_ids: [getCatId("Steering Systems")],
      metadata: {
        oem_reference: "FCB-001",
        brand: "FujiKiko",
        application: "Steering",
      },
      sku: "FUJIKIKO-FCB001",
      price: 3499,
      image: JTEKT_IMAGES.steering,
    },
    // Driveline
    {
      title: "Torsen T-2 Limited Slip Differential",
      handle: "torsen-t2-lsd",
      description:
        "Torsen T-2 torque-sensing limited slip differential for AWD applications.",
      category_ids: [getCatId("Driveline")],
      metadata: {
        oem_reference: "T-2",
        brand: "Torsen",
        application: "Driveline",
      },
      sku: "TORSEN-T2",
      price: 24999,
      image: JTEKT_IMAGES.driveline,
    },
    {
      title: "JTEKT Propeller Shaft Center Bearing",
      handle: "jtekt-propeller-shaft-bearing",
      description:
        "Center support bearing for two-piece propeller shafts. Reduces vibration.",
      category_ids: [getCatId("Driveline")],
      metadata: {
        oem_reference: "PSB-442",
        brand: "JTEKT",
        application: "Driveline",
      },
      sku: "JTEKT-PSB442",
      price: 4599,
      image: JTEKT_IMAGES.driveline,
    },
    // Aftermarket
    {
      title: "Koyo Timing Belt Kit with Bearings",
      handle: "koyo-timing-belt-kit",
      description:
        "Complete timing belt kit including idler and tensioner bearings. For popular engine applications.",
      category_ids: [getCatId("Aftermarket")],
      metadata: {
        oem_reference: "TBK-001",
        brand: "Koyo",
        application: "Aftermarket",
      },
      sku: "KOYO-TBK001",
      price: 8999,
      image: JTEKT_IMAGES.bearing,
    },
  ];

  let created = 0
  for (const p of industrialProducts) {
    try {
      await createProductsWorkflow(container).run({
        input: {
          products: [
            {
              title: p.title,
              handle: p.handle,
              description: p.description,
              collection_id: jtektCollection.id,
              category_ids: p.category_ids,
              metadata: p.metadata,
              weight: 500,
              status: ProductStatus.PUBLISHED,
              images: [{ url: p.image }],
              options: [{ title: "Type", values: ["Standard"] }],
              variants: [
                {
                  title: p.title,
                  sku: p.sku,
                  options: { Type: "Standard" },
                  manage_inventory: false,
                  prices: [
                    { amount: p.price, currency_code: "eur" },
                    { amount: p.price, currency_code: "usd" },
                  ],
                },
              ],
              sales_channels: [{ id: defaultSalesChannel.id }],
            },
          ],
        },
      })
      created++
    } catch (err: unknown) {
      const msg = (err as Error)?.message ?? ""
      if (msg.includes("already exists") || msg.includes("duplicate")) {
        logger.info(`Skipping ${p.handle} (already exists)`)
      } else {
        throw err
      }
    }
  }

  logger.info(
    `Seeded ${created} JTEKT industrial products (${industrialProducts.length - created} already existed) across ${jtektCategories.length} categories.`
  )
}
