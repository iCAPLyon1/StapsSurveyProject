<?php

namespace StapsSurvey\Controller;

use Silex\Application;

abstract class AbstractController
{
    /**
     * @var Application;
     */
    protected $app = null;

    /**
     * @param Application $app
     */
    public function setContainer(Application $app)
    {
        $this->app = $app;
    }
}