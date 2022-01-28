import { useContext } from 'react';
import { ResponsiveContext } from '../../App';
import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';

export interface TrainerCardConfig {
  showOrdinal?: boolean
}

export interface TrainerCardProps extends CardProps {
  configuration: TrainerCardConfig
}

export interface SimpleImage {
  url: string,
  width: number,
  height: number
}

export interface Image extends SimpleImage {
  sourceUrl: string,
  thumbnails: SimpleImage[]
}

interface Logo {
  image?: Image
}

export interface TrainerData {
  name?: string,
  c_inspirationalQuote?: string,
  logo?: Logo
}

export interface TrainerCardCssClasses {
  container?: string,
  descriptionContainer?: string,
  name?: string,
  // TODO: why can't I use the tailwind pixels here
  trainerPhoto?: string,
  ctaButton?: string,
  ctaButtonText?: string
}

const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex flex-col justify-between border-b p-4 shadow-sm',
  descriptionContainer: 'w-full sm:text-sm text-3xl font-heading ',
  name: 'sm:text-base text-3xl font-medium font-body font-bold',
  ctaButton: 'flex border rounded-md mt-4 px-4 bg-black justify-center',
  ctaButtonText: 'font-heading text-white font-bold sm:text-base text-3xl py-3 sm:py-0',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function TrainerCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  // const smallestThumbnail = trainer.logo?.image?.thumbnails[trainer.logo?.image?.thumbnails.length - 1].url

  const isMobile = useContext(ResponsiveContext);

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>;
  }

  function renderQuote(quote?: string) {
    return <div className={cssClasses.descriptionContainer}>{quote}</div>;
  }

  return (
    <div className={cssClasses.container}>
      <div
        // style={{ height: isMobile ? '512px' : '256px', width: isMobile ? '512px' : '256px' }
        style={{
          height: isMobile ? '15rem' : '16rem',
          // width: isMobile ? '22rem' : '16rem',
          width: isMobile ? '36rem' : '20rem',
        }}>
        <img
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          alt="Trainer Headshot"
          style={{ objectFit: 'cover', width: '500px', height: '250px' }}
          height="512"
          width="512"
        />
      </div>
      <div className="my-6 sm:my-2">
        <div>{renderName(trainer.name)}</div>
        <div className="h-6">{renderQuote(trainer.c_inspirationalQuote)}</div>
      </div>
      <div className="flex flex-col text-black sm:flex-row sm:justify-between">
        <div className={cssClasses.ctaButton}>
          <div className={cssClasses.ctaButtonText}>VIEW SCHEDULE</div>
        </div>
        <div className={cssClasses.ctaButton}>
          <div className={cssClasses.ctaButtonText}>CONTACT</div>
        </div>
      </div>
    </div>
  );
}
