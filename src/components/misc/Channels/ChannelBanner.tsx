import {
  faHashtag,
  faStar,
  faUser,
  faThumbTack,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";
import ContributorsModal from "../../Modals/ContributorsModal";
import useProjectStore from "@/store/home/project-store";
import type { Contributer, Profile } from "@prisma/client";

interface IContributer extends Contributer {
  profile: Profile;
}

interface IProjectBannerProps {
  contributors: { profileId: string }[];
  name: string;
}

const ProjectBanner: React.FunctionComponent<IProjectBannerProps> = ({
  contributors,
  name,
}) => {
  const projectStore = useProjectStore();
  const [viewContributors, setViewContributors] = useState(false);
  const [viewPins, setViewPins] = useState(false);
  const [viewInfo, setViewInfo] = useState(false);

  // const channelQuery = trpc.server.getChannelById.useQuery({ id: channel?.id ?? '' });

  return (
    <>
      {viewContributors && (
        <ContributorsModal
          isOpen={viewContributors}
          contributors={contributors}
          close={() => setViewContributors(false)}
        />
      )}

      {/* {viewPins && (
        <Modal close={() => setViewPins(false)}>
          <div className="text-7xl text-white">Pins</div>
        </Modal>
      )}

      {viewInfo && (
        <Modal close={() => setViewInfo(false)}>
          <div className="text-7xl text-white">General Info</div>
        </Modal>
      )} */}

      <div className=" border-b-2 p-4">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHashtag} className="text-xs" />
          <p className="font-bold">{name}</p>
          <FontAwesomeIcon icon={faStar} className="text-xs text-green-700" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <div
              onClick={() => setViewContributors(!viewContributors)}
              className="flex cursor-pointer items-center gap-2"
            >
              <FontAwesomeIcon icon={faUser} className="text-xs" />
              <p>{2}</p>
            </div>
            <div
              onClick={() => setViewPins(!viewPins)}
              className="flex cursor-pointer items-center gap-2"
            >
              <FontAwesomeIcon icon={faThumbTack} className="text-xs" />
              <p>7</p>
            </div>
            <p className="font-semibold text-slate-500">
              Product design and Testing
            </p>
          </div>

          <FontAwesomeIcon
            onClick={() => setViewInfo(!viewInfo)}
            icon={faInfo}
            className="flex h-4 w-4 cursor-pointer items-center justify-between rounded-full border border-slate-500 p-1 text-slate-500"
          />
        </div>
      </div>
    </>
  );
};

export default ProjectBanner;
