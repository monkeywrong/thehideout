<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Hideout
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="theHideoutApp">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<script>//document.cookie='resolution='+Math.max(screen.width,screen.height)+'; path=/';</script>
<script>document.cookie='resolution='+Math.max(window.innerWidth,window.innerHeight)+'; path=/';</script>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> ng-controller="mainCtrl">

  <div id="page" class="hfeed site">
    <a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'hideout' ); ?></a>

    <div class="container-fluid">
      <div class='row'>
        
        <header id="masthead" class="site-header " role="banner">

          <div class="navbar-container navbar-fixed-top">
            <nav class="navbar navbar-default col-md-12" role="navigation"> 
            <!-- Brand and toggle get grouped for better mobile display --> 
            <div class="row">

              <div class=" visible-xs visible-sm col-sm-4 col-sm-offset-4">
                <div class="navbar-header"> 
                  <a class="navbar-brand" href="<?php bloginfo('url') ?>"><h2><?php bloginfo('name') ?></h2></a>
                  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"> 
                    <span class="sr-only">Toggle navigation</span> 
                    <span class="icon-bar"></span> 
                    <span class="icon-bar"></span> 
                    <span class="icon-bar"></span> 
                  </button>
                </div> 
              </div>

              <div class="col-xs-12 col-sm-6 col-md-5">
                <div class="collapse navbar-collapse navbar-right"> 
                  <?php /* Primary navigation */
                    wp_nav_menu( array(
                      'menu'              => 'primary',
                      'theme_location'    => 'primary',
                      'depth'             => 2,
                      'container'         => 'div',
                      'container_class'   => 'collapse navbar-collapse',
                      'container_id'      => '',
                      'menu_class'        => 'nav navbar-nav',
                      'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                      'walker'            => new wp_bootstrap_navwalker())
                    );
                  ?>
                </div>
              </div>

              <!-- visible on md and above -->
              <div class=" visible-md visible-lg col-sm-2 col-lg-2">
                <div class="navbar-header"> 
                  <a class="navbar-brand" href="<?php bloginfo('url') ?>"><h2><?php bloginfo('name') ?></h2></a>
                  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"> 
                    <span class="sr-only">Toggle navigation</span> 
                    <span class="icon-bar"></span> 
                    <span class="icon-bar"></span> 
                    <span class="icon-bar"></span> 
                  </button>
                </div> 
              </div>
              <!-- Collect the nav links, forms, and other content for toggling --> 

              <div class="col-xs-12 col-sm-6 col-md-5">
                <div class="collapse navbar-collapse navbar-left"> 
                  <?php /* Primary navigation */
                    wp_nav_menu( array(
                      'menu'              => 'secondary',
                      'theme_location'    => 'secondary',
                      'depth'             => 2,
                      'container'         => 'div',
                      'container_class'   => 'collapse navbar-collapse',
                      'container_id'      => '',
                      'menu_class'        => 'nav navbar-nav',
                      'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                      'walker'            => new wp_bootstrap_navwalker())
                    );
                  ?>
                </div>
              </div>
              
            </div>


            </nav>
          </div>
        </header><!-- #masthead -->

      </div> <!-- row -->
    </div> <!-- container-fluid -->

    <div id="content" class="site-content">
