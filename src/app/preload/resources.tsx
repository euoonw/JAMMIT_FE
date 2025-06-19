export default function PreloadResources() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/main/img_main_banner_pc.avif"
        media="(min-width: 1344px)"
      />
      <link
        rel="preload"
        as="image"
        href="/images/main/img_main_banner_tab.avif"
        media="(min-width: 744px) and (max-width: 1343px)"
      />
      <link
        rel="preload"
        as="image"
        href="/images/main/img_main_banner_mob.avif"
        media="(max-width: 743px)"
      />
    </>
  );
}
