// The seed corpus: the authored portfolio content that gets imported into
// Payload. The SITE never reads these files — its only content source is the
// running CMS (nextjs/docs/payload-cms.md). Types live in the site package:
// ../../nextjs/lib/projects/projects.ts.
//
// One file per project, grouped by folder: professional/ and personal/.
import type { ProjectContent } from "../../nextjs/lib/projects/projects.ts";
import { projectCadAnd3dPrinting } from "./personal/cad_and_3d_printing.ts";
import { projectCustomKeyboards } from "./personal/custom_keyboards.ts";
import { projectGraphqlTypesafeAdapter } from "./personal/graphql_typesafe_adapter.ts";
import { projectPiExtensions } from "./personal/pi_extensions.ts";
import { projectIscWorkflow } from "./professional/isc_workflow.ts";
import { projectMyKampusRadio } from "./professional/mykampus_radio.ts";
import { projectSansols } from "./professional/sansols.ts";

/** Import order is the initial drag order after seeding. */
export const projects: ProjectContent[] = [
  projectSansols,
  projectIscWorkflow,
  projectMyKampusRadio,
  projectGraphqlTypesafeAdapter,
  projectCustomKeyboards,
  projectCadAnd3dPrinting,
  projectPiExtensions,
];
