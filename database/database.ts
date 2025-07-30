import { BLANK_USER_MODEL } from "@/constants/BlankModels";
import { AddModel } from "@/models/other-masters/AddModel";
import { AxisModel } from "@/models/other-masters/AxisModel";
import { ClassModel } from "@/models/other-masters/ClassModel";
import { ColorConfigModel } from "@/models/other-masters/ColorConfigModel";
import { CYLModel } from "@/models/other-masters/CYLModel";
import { DiagnosisModel } from "@/models/other-masters/DiagnosisModel";
import { DistanceDvaModel } from "@/models/other-masters/DistanceDvaModel";
import { FrameMaterialModel } from "@/models/other-masters/FrameMaterialModel";
import { LensMaterialModel } from "@/models/other-masters/LensMaterialModel";
import { LensSurfaceCoatingModel } from "@/models/other-masters/LensSurfaceCoatingModel";
import { LensTintModel } from "@/models/other-masters/LensTintModel";
import { LensTypeModel } from "@/models/other-masters/LensTypeModel";
import { ModeOfWearModel } from "@/models/other-masters/ModeOfWearModel";
import { NvaModel } from "@/models/other-masters/NvaModel";
import { OcularModel } from "@/models/other-masters/OcularModel";
import { PHModel } from "@/models/other-masters/PHModel";
import { ReachConfigurationModel } from "@/models/other-masters/ReachConfigurationModel";
import { ReasonForReferralModel } from "@/models/other-masters/ReasonForReferral";
import { SpecialInstructionModel } from "@/models/other-masters/SpecialInstructionModel";
import { SpecialityLensModel } from "@/models/other-masters/SpecialityLensModel";
import { SPHModel } from "@/models/other-masters/SPHModel";
import { TorchLightModel } from "@/models/other-masters/TorchLightModel";
import { StudentModel } from "@/models/school/StudentModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { FilterModel } from "@/models/ui/FilterModel";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { UserModel } from "@/models/user/UserModel";
import { SQLiteDatabase } from "expo-sqlite";
import { saveNewStudent } from "./school-student-db";

export const insertClassesToDB = async (
  db: SQLiteDatabase,
  items: ClassModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO classes (id,title,minAge,maxAge,displayOrder) VALUES (?,?,?,?,?)`,
          item.id,
          item.title,
          item.minAge,
          item.maxAge,
          item.displayOrder
        );
      });
    });
    console.log("REsponse", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const insertMasterDataToDB = async (
  db: SQLiteDatabase,
  items: GridDropdownModel[],
  tableName: string
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO ${tableName} (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder
        );
      });
    });
    console.log("REsponse", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMasterDataFromDB = async (
  db: SQLiteDatabase,
  tableName: string
) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM ${tableName}`);
    const arr: GridDropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new GridDropdownModel({
            id: item.id,
            title: item.title,
            description: item.description,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const saveMasterDropdownToDB = async (
  db: SQLiteDatabase,
  items: DropdownModel[],
  tableName: string
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO ${tableName} (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.value,
          item.label,
          1
        );
      });
    });
    console.log("REsponse", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMasterDropdownFromDB = async (
  db: SQLiteDatabase,
  tableName: string
) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM ${tableName}`);
    console.log("Response SPHS", response);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        console.log("O", item);
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.description,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save Classes to DB
export const saveAllClasses = async (
  db: SQLiteDatabase,
  items: ClassModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO classes (id,title,minAge,maxAge,displayOrder) VALUES (?,?,?,?,?)`,
          item.id,
          item.title,
          item.minAge,
          item.maxAge,
          item.displayOrder
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Classes
export const findAllClasses = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM classes`);
    const arr: ClassModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new ClassModel({
            id: item.id,
            title: item.title,
            minAge: item.minAge,
            maxAge: item.maxAge,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Class Dropdown
export const findAllClassesDropdowns = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM classes`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save Vision Centers
export const saveVisionCenters = async (
  db: SQLiteDatabase,
  items: DropdownModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DropdownModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO visionCenters (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.value,
          item.label,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Vision Centers
export const findAllVisionCenters = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM visionCenters`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save All Hospitals
export const saveHospitals = async (
  db: SQLiteDatabase,
  items: DropdownModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DropdownModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO hospitals (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.value,
          item.label,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Hospitals
export const findAllHospitals = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM hospitals`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save Other Facilities
export const saveOtherFacilities = async (
  db: SQLiteDatabase,
  items: DropdownModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DropdownModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO otherFacilities (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.value,
          item.label,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Other Facilities
export const findAllOtherFacilities = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM otherFacilities`);
    console.log("OTHER Facility %%%%%%%%%", response);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save Ocular Complaints
export const saveOcularComplaints = async (
  db: SQLiteDatabase,
  items: OcularModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: OcularModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO ocularComplaints (id,title,description, displayOrder,isReferCase, isBinacular, ocularType) VALUES (?,?,?,?,?,?,?)`,
          item.id,
          item.ocularName,
          item.ocularName,
          item.displayOrder ?? 0,
          item.isReferCase,
          item.isBinacular,
          item.ocularType
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Ocular Complaints
export const findAllOcularComplaints = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM ocularComplaints`);
    const arr: OcularModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new OcularModel({
            id: item.id,
            ocularName: item.title,
            displayOrder: item.displayOrder ?? 0,
            isReferCase: item.isReferCase,
            isBinacular: item.isBinacular,
            ocularType: item.ocularType,
            isActive: "Yes",
            isSelected: false,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

//VISUAL ACUITY
// Save Distance DVA
export const saveDvas = async (
  db: SQLiteDatabase,
  items: DistanceDvaModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DistanceDvaModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO dvas (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get DVAs
export const findAllDvas = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM dvas`);
    const arr: DistanceDvaModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DistanceDvaModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

//SAve NVA
export const saveNvas = async (db: SQLiteDatabase, items: NvaModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: NvaModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO nvas (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get NVA
export const findAllNvas = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM nvas`);
    const arr: GridDropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new GridDropdownModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save PH
export const savePhs = async (db: SQLiteDatabase, items: PHModel[]) => {
  try {
    console.log("Saving PHS ....");
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: PHModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO phs (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get PH
export const findAllPhs = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM phs`);
    const arr: PHModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new PHModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

//REFRACTION MASTER

// Save Adds
export const saveAdds = async (db: SQLiteDatabase, items: AddModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: AddModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO adds (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Adds
export const findAllAdds = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM adds`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Axis
export const saveAxis = async (db: SQLiteDatabase, items: AxisModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: AxisModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO axis (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Axis
export const findAllAxis = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM axis`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save SPHS
export const saveSphs = async (db: SQLiteDatabase, items: SPHModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: SPHModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO sphs (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get SPHs
export const findAllSphs = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM sphs`);
    const arr: GridDropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new GridDropdownModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Cyls
export const saveCyls = async (db: SQLiteDatabase, items: CYLModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: CYLModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO cyls (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Adds
export const findAllCyls = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM cyls`);
    const arr: GridDropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new GridDropdownModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Cyls
export const saveReachConfigs = async (
  db: SQLiteDatabase,
  item: ReachConfigurationModel
) => {
  try {
    const response = db.runSync(
      `INSERT OR REPLACE INTO reachConfigs (id,isNpcTest,isCoverTest,isPlus2DTest) VALUES (?,?,?,?)`,
      1,
      item.isNpcTest,
      item.isCoverTest,
      item.isPlus2DTest
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Reach Configs
export const findReachConfigs = async (db: SQLiteDatabase) => {
  try {
    const response: any = await db.getFirstSync(
      `SELECT * FROM reachConfigs WHERE id=1`
    );
    console.log("Response *************************************", response);
    if (response) {
      return new ReachConfigurationModel({
        id: 1,
        partnerName: "",
        partnerId: "",
        isNpcTest: response.isNpcTest == 1 ? true : false,
        isCoverTest: response.isCoverTest == 1 ? true : false,
        isPlus2DTest: response.isPlus2DTest == 1 ? true : false,
        isActive: "",
      });
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveFrameMaterials = async (
  db: SQLiteDatabase,
  items: FrameMaterialModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: FrameMaterialModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO frameMaterials (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllFrameMaterials = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM frameMaterials`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveLensMaterials = async (
  db: SQLiteDatabase,
  items: LensMaterialModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: LensMaterialModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO lensMaterials (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllLensMaterials = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM lensMaterials`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveDiagnosisMaster = async (
  db: SQLiteDatabase,
  items: DiagnosisModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DiagnosisModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO diagnosisMaster (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.category,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllDiagnosisMaster = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM diagnosisMaster`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveLensSurfaceCoatings = async (
  db: SQLiteDatabase,
  items: LensSurfaceCoatingModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: LensSurfaceCoatingModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO lensSurfaceCoatings (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllLensSurfaceCoatings = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM lensSurfaceCoatings`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveLensTints = async (
  db: SQLiteDatabase,
  items: LensTintModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: LensTintModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO lensTints (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllLensTints = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM lensTints`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveLensTypes = async (
  db: SQLiteDatabase,
  items: LensTypeModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: LensTypeModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO lensTypes (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllLensTypes = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM lensTypes`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveModesOfWear = async (
  db: SQLiteDatabase,
  items: ModeOfWearModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: ModeOfWearModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO modeOfWears (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllModeOfWears = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM modeOfWears`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveSpecialInstructions = async (
  db: SQLiteDatabase,
  items: SpecialInstructionModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: SpecialInstructionModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO specialInstructions (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllSpecialInstructions = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM specialInstructions`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveSpecialityLens = async (
  db: SQLiteDatabase,
  items: SpecialityLensModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: SpecialityLensModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO specialityLens (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllSpecialityLens = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM specialityLens`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveReasonForReferrals = async (
  db: SQLiteDatabase,
  items: ReasonForReferralModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: ReasonForReferralModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO reasonForRefferals (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.reasonName,
          item.reasonDescription,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllReasonForReferrals = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM reasonForRefferals`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveTorchligtFindings = async (
  db: SQLiteDatabase,
  items: TorchLightModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: TorchLightModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO torchlightFindings(id,title,description,displayOrder,action) VALUES (?,?,?,?,?)`,
          item.id,
          item.finding,
          item.finding,
          item.displayOrder ?? 0,
          item.action
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Torchlight Findings
export const findAllTorchlightFindings = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM torchlightFindings`);
    const arr: TorchLightModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new TorchLightModel({
            id: item.id,
            finding: item.title,
            displayOrder: item.displayOrder,
            action: item.action,
            isSelected: false,
            isActive: "Yes",
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const findUniqueClasses = async (
  db: SQLiteDatabase,
  schoolId: string
) => {
  console.log("classId Id", schoolId);
  try {
    const response = await db.getAllAsync(
      `SELECT DISTINCT s.classId,cl.title FROM students s JOIN classes cl ON s.classId = cl.id WHERE s.schoolId="${schoolId}"`
    );

    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.classId,
            value: item.title,
            label: item.title,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Get Sections
export const findUniqueSections = async (
  db: SQLiteDatabase,
  schoolId: string,
  classId: string
) => {
  console.log("classId Id", schoolId);
  try {
    const response = await db.getAllAsync(
      `SELECT DISTINCT section FROM students WHERE schoolId="${schoolId}" AND classId="${classId}"`
    );
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any, index: number) => {
        if (item.section != "") {
          arr.push(
            new DropdownModel({
              id: (index + 1)?.toString(),
              value: item.section,
              label: item.section,
            })
          );
        }
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveUsers = async (db: SQLiteDatabase, items: UserModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: UserModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO users(id,userName,password,firstName,middleName,lastName,designation,isPartnerAgreement,isUserAgreement,isPIIAgreement,isDevicePreparation,isDataSync,isQualityCheck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          item.id,
          item.userName,
          item.password,
          item.firstName,
          item.middleName,
          item.lastName,
          item.designation,
          item.isPartnerAgreement,
          item.isUserAgreement,
          item.isPIIAgreement,
          item.isDevicePreparation,
          item.isDataSync,
          item.isQualityCheck
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findUsers = async (db: SQLiteDatabase) => {
  try {
    const response: any = await db.getAllAsync(`SELECT * FROM users`);
    console.log("RESSSSS", response);
  } catch (err) {
    console.log(err);
    return BLANK_USER_MODEL;
  }
};

// Get Torchlight Findings
export const findUserById = async (db: SQLiteDatabase, id: string) => {
  try {
    const response: any = await db.getFirstAsync(
      `SELECT * FROM users WHERE id=${id}`
    );
    console.log("RESSSSS", response);
    if (response) {
      return new UserModel({
        id: response.id,
        userName: response.userName,
        password: response.password,
        firstName: response.firstName,
        middleName: response.middleName,
        lastName: response.lastName,
        designation: response.designation,
        isPartnerAgreement: response.isPartnerAgreement,
        isUserAgreement: response.isUserAgreement,
        isPIIAgreement: response.isPIIAgreement,
        isDevicePreparation: response.isDevicePreparation,
        isDataSync: response.isDataSync,
        isQualityCheck: response.isQualityCheck,
      });
    } else {
      return BLANK_USER_MODEL;
    }
  } catch (err) {
    console.log(err);
    return BLANK_USER_MODEL;
  }
};

// Save Spec Booking
export const saveSpecBooking = async (
  db: SQLiteDatabase,
  studentId: string,
  frameName: string
) => {
  try {
    const response = db.runSync(
      "INSERT OR REPLACE INTO spectacleBooking (id,frameName,bookingDate,studentId) VALUES (?,?,?,?)",
      studentId,
      frameName,
      new Date().toISOString(),
      studentId
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

//Find Spec Booking Students
export const getSpecStudentsBySchoolId = async (
  db: SQLiteDatabase,
  schoolId: string,
  appliedFilters: FilterModel
) => {
  console.log("APPLIED", appliedFilters);
  let whereCondition = `s.schoolId="${schoolId}" AND rf.spectaclesPrescribed=true`;

  if (appliedFilters.classId != "") {
    whereCondition += ` AND students.classId=${appliedFilters.classId}`;
  }
  if (appliedFilters.section != "") {
    whereCondition += ` AND students.section="${appliedFilters.section}" COLLATE NOCASE`;
  }

  console.log("WHERE", whereCondition);
  console.log(
    "************ GETTING STUDENTS SPECTACLE BOOKING ****************"
  );
  try {
    const response = await db.getAllAsync(
      `SELECT s.id, s.firstName,s.gender,s.age,s.classId,s.section,s.studentId,sb.bookingDate,cl.title FROM students s JOIN classes cl ON s.classId = cl.id  INNER JOIN  refraction rf ON s.id = rf.mrId  LEFT JOIN spectacleBooking sb ON s.id = s.studentId  WHERE ${whereCondition}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const saveQRData = async (db: SQLiteDatabase, data: any) => {
  console.log("QR  DD &&&&&&&&&&&&&&&&&&&&&&&&", data);
  let item7 = JSON.parse(data);
  console.log("Item 7 &&&", item7.id);
  try {
    const existingStudent = await db.getFirstAsync(
      `SELECT * FROM students WHERE id="${item7.id}"`
    );
    console.log(existingStudent);
    if (existingStudent) {
      console.log(existingStudent);
      //Upate Details
      const responseScreening = await db.runAsync(
        `INSERT OR REPLACE INTO screenings (id,studentId,psStatus,referralReason) VALUES (?,?,?,?)`,
        item7.id,
        item7.id,
        item7.psStatus,
        item7.referralReason
      );
      console.log("SRECCCC", responseScreening);
      return responseScreening;
    } else {
      //Add New Student & Screening
      saveNewStudent(
        db,
        new StudentModel({
          id: item7.id,
          studentId: item7.id,
          tempId: item7.id,
          firstName: item7.firstName,
          middleName: item7.middleName,
          lastName: item7.lastName,
          classId: item7.classId,
          classTitle: "",
          section: "",
          rollNo: "0",
          gender: "",
          age: "0",
          dob: "",
          relation: "",
          nextOfKin: "",
          specialNeed: "",
          session: "",
          contactPersonName: "",
          contactPersonMobileNo: "",
          relationshipWithStudent: "",
          schoolId: item7.schoolId,
          schoolName: "",
          isActive: "",
          psStatus: "",
          isMarkForQC: false,
          mrNo: "",
          facilityType: "",
          facilityName: "",
          isUpdated: true,
          targetGroup: "",
          lastPSStatus: "",
          lastReasonForReferral: "",
          lastReportDate: "",
          lastSpectacleStatus: "",
          lastAnySurgeryDone: "",
        })
      );
      console.log("ITEMMMMMMMM 7", item7);
      const responseScreening = await db.runAsync(
        `INSERT OR REPLACE INTO screenings (id,studentId,psStatus,referralReason) VALUES (?,?,?,?)`,
        item7.id,
        item7.id,
        item7.psStatus,
        item7.referralReason
      );
      console.log("SRECCCC REE @2", responseScreening);
      return responseScreening;
    }

    // const response: any = await db.withTransactionAsync(async () => {
    //   db.runAsync(`INSERT INTO students VALUES ()`);
    // });
  } catch (err) {
    console.log(err);
  }
};

export const saveColorConfigs = async (
  db: SQLiteDatabase,
  items: ColorConfigModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO colorVisionConfigs (id,classId,gender,required) VALUES (?,?,?,?)`,
          item.id,
          item.classId,
          item.gender,
          item.isRequired
        );
      });
    });
    console.log("REsponse", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findColorConfigsStatus = async (
  db: SQLiteDatabase,
  gender: string,
  classId: number
) => {
  try {
    const response: any = await db.getFirstAsync(
      `SELECT * FROM colorVisionConfigs WHERE gender="${gender}" AND classId=${classId}`
    );
    if (response) {
      return { isRequired: response.required };
    }
  } catch (err) {
    console.log(err);
    return { isRequired: false };
  }
};

export const TABLES = {
  DISTANCE_DVA_TABLE: "dvas",
  PH_TABLE: "phs",
  NVA_TABLE: "nvas",
  HOSPITAL_TABLE: "hospitals",
  VISION_CENTER_TABLE: "visionCenters",
  OTHER_FACILITY_TABLLE: "otherFacilities",
};
