export const REGEX_VALIDATOR = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')

export const DEFAULT_PROFILE_IMAGE_URL = 'https://tg2dnabpgwgcbyjlgpsos7muwkgeoinl4qidld7wgd627klovi.arweave.net/mbQ2gC81jCDhKzPk6X2Us-oxHIavkEDWP9jD9r6luqs?ext=png/'

export const COLLECTIONS_DB_PATH = 'collections/'
export const USER_DB_PATH = 'users/'
export const COLLECTION_IMAGES_DB_PATH = 'images/collections/'

export const COLLECTIONS_STORAGE_PATH = 'Collections/'
export const PROFILE_IMAGES_FOLDER_PATH = 'ProfileImages/'
export const LAYERS_FOLDER_PATH = 'Layers/'

export const MAINNET_BETA_URL = 'https://api.mainnet-beta.solana.com'
export const DEVNET_URL = 'https://api.devnet.solana.com'

export const EMPTY_STRING: string = '';
export const FILE_TYPE_PNG: string = 'image/png';
export const FILE_TYPE_JPG: string = 'image/jpg';
export const FILE_TYPE_JPEG: string = 'image/jpeg';
export const FILE_TYPE_GIF: string = 'image/gif';

export const ONE_OF_ONE_PERK: string = "1 OF 1 ART";
export const DAO_PERK: string = "DAO MEMBERSHIP";
export const COMMUNITY_PERK: string = "COMMUNITY";

export interface User {
    uid: String;
    username: String;
    email: String;
    profileImageURL: String;
    firstName?: String;
    lastName?: String;
}

export interface Collection {
    collectionId: string;
    collectionTitle: string;
    collectionDescription: string;
    collectionProfileImageURL: string;
    creatorUserId: string;
    timeStamp: number;
    totalSupply?: number;
    saleStartDate?: number;
    publicSalePrice?: number;
}

export interface EraMetaOriginalCollection extends Collection {
    isAuction: boolean;
    perks?: string[];
    websiteURL: string;
    twitterURL: string;
    discordURL?: string;
    analystReportURL?: string;
    pathsToArt?: Map<string, string>;
}

export interface CollectionImage {
    downloadUrl: string;
    groupName: string;
    fileName: string;
    width: number;
    height: number;
}

export const ERAMETA_ORIGINALS_COLLECTIONS: Map<string, EraMetaOriginalCollection> = new Map();
ERAMETA_ORIGINALS_COLLECTIONS.set(
    "EraMeta DAO",
    {
        collectionId: "randomID",
        collectionProfileImageURL: "https://firebasestorage.googleapis.com/v0/b/truenfts.appspot.com/o/Manual_Input%2FEraMeta-Gold-Key.gif?alt=media&token=af4c6c8f-3bcf-46e3-a5f1-9a1b87bd2460",
        collectionTitle: "EraMeta DAO",
        collectionDescription: "Ultimate revenue sharing NFT and DAO membership pass.",
        websiteURL: "https://erameta.io/home",
        twitterURL: "https://twitter.com/EraMetaDao",
        discordURL: "https://discord.gg/Nqxpm24CFA",
        creatorUserId: "0000000000",
        isAuction: false,
        timeStamp: 123456789,
        totalSupply: 3110,
        publicSalePrice: 3,
        perks: [DAO_PERK],
        pathsToArt: new Map()
        .set("Diamond Key", "images/EraMetaDropItems/diamondKey")
        .set("Gold Key", "images/EraMetaDropItems/goldKey")
        .set("Silver Key", "images/EraMetaDropItems/silverKey")
    }
);
ERAMETA_ORIGINALS_COLLECTIONS.set(
    "Automobili Art",
    {
        collectionId: "randomID",
        collectionProfileImageURL: "../../../assets/videos/liveSketches.gif",
        collectionTitle: "Automobili Art",
        collectionDescription: "Maritime Motosports Hall of Fame inductee & the world's most published automotive artist.",
        websiteURL: "https://erameta.io/home",
        twitterURL: "https://twitter.com/Automobiliart",
        creatorUserId: "0000000000",
        isAuction: true,
        timeStamp: 123456789,
        totalSupply: 1,
        perks: [ONE_OF_ONE_PERK],
        pathsToArt: new Map()
        .set("Live Sketches", "images/PCDropItems/liveSketches")
        .set("Color on Color", "images/PCDropItems/colorOnColor")
        .set("Pen & Ink", "images/PCDropItems/penAndInk")
        .set("Black & White on Color", "images/PCDropItems/bwColor")
    }
);
ERAMETA_ORIGINALS_COLLECTIONS.set(
    "GLITCH Magazine",
    {
        collectionId: "randomID",
        collectionProfileImageURL: "../../../assets/videos/glitchmag.gif",
        collectionTitle: "GLITCH Magazine",
        collectionDescription: "A niche hybrid magazine for the digital natives and print enthusiasts, driven by fashion, technology and new talent.",
        websiteURL: "https://linktr.ee/officialglitchmag",
        twitterURL: "https://twitter.com/offglitchmag",
        creatorUserId: "0000000000",
        isAuction: false,
        timeStamp: 123456789,
        perks: [COMMUNITY_PERK],
        publicSalePrice: 0,
    }
);
