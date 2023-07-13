<?php
/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2015 (original work) Open Assessment Technologies;
 *
 *
 */

use oat\wiquid\scripts\install\RegisterPciAbeilleIMS;
use oat\wiquid\scripts\install\RegisterPciBertholdIMS;
use oat\wiquid\scripts\install\RegisterPciBroncoIMS;
use oat\wiquid\scripts\install\RegisterPciCuisineIMS;
use oat\wiquid\scripts\install\RegisterPciDelorIMS;
use oat\wiquid\scripts\install\RegisterPciEffetDeSerreIMS;
use oat\wiquid\scripts\install\RegisterPciForceGraviteIMS;
use oat\wiquid\scripts\install\RegisterPciLampeDoubleIMS;
use oat\wiquid\scripts\install\RegisterPciLentillesIMS;
use oat\wiquid\scripts\install\RegisterPciMaraisSalantIMS;
use oat\wiquid\scripts\install\RegisterPciNouvelleTerreIMS;
use oat\wiquid\scripts\install\RegisterPciRelatemIMS;
use oat\wiquid\scripts\install\RegisterPciTrainIMS;
use oat\wiquid\scripts\install\RegisterPciVolcanismeIMS;
use oat\wiquid\scripts\install\RegisterPciExploIMS;
use oat\wiquid\scripts\install\RegisterPciSnapIMS;
use oat\wiquid\scripts\install\RegisterPciCircuitIMS;
use oat\wiquid\scripts\install\RegisterPciChatbotIMS;
use oat\wiquid\scripts\install\RegisterPciGlipsIMS;


return array(
    'name' => 'wiquid',
	'label' => '🚀 DEPP IMS PCIs installer ready for TAO advanced',
	'description' => 'Abeille,Berthold,Bronco,Cuisine,Delor,EffetdeSerre,ForceGravite,LampeDouble,Lentilles,MaraisSalant,NouvelleTerre,Relatem,Train,Volcanisme,Explorer,Snap,Circuit,ChatBot',
    'version' => '1.0.0',
    'license' => 'GPL-2.0',
	'author' => 'janfix',
	'managementRole' => 'http://www.tao.lu/Ontologies/generis.rdf#wiquidManager',
    'acl' => array(
        array('grant', 'http://www.tao.lu/Ontologies/generis.rdf#wiquidManager', array('ext'=>'wiquid')),
    ),
    'install' => array(
        'php'	=> array(
			RegisterPciAbeilleIMS::class,
            RegisterPciBertholdIMS::class,
            RegisterPciBroncoIMS::class,
            RegisterPciCuisineIMS::class,
            RegisterPciDelorIMS::class,
            RegisterPciEffetDeSerreIMS::class,
            RegisterPciForceGraviteIMS::class,
            RegisterPciLampeDoubleIMS::class,
            RegisterPciLentillesIMS::class,
            RegisterPciMaraisSalantIMS::class,
            RegisterPciNouvelleTerreIMS::class,
            RegisterPciRelatemIMS::class,
            RegisterPciTrainIMS::class,
            RegisterPciVolcanismeIMS::class,
            RegisterPciExploIMS::class,
            RegisterPciSnapIMS::class,
            RegisterPciCircuitIMS::class,
            RegisterPciChatbotIMS::class,            
            RegisterPciGlipsIMS::class
		)
    ),
    'update' => 'oat\\wiquid\\scripts\\update\\Updater',
    'uninstall' => array(
    ),
    'autoload' => array (
        'psr-4' => array(
            'oat\\wiquid\\' => dirname(__FILE__).DIRECTORY_SEPARATOR
        )
    ),
    'routes' => array(
        '/wiquid' => 'oat\\wiquid\\controller'
    ),
	'constants' => array(
	    # views directory
	    "DIR_VIEWS" => dirname(__FILE__).DIRECTORY_SEPARATOR."views".DIRECTORY_SEPARATOR,

		#BASE URL (usually the domain root)
		'BASE_URL' => ROOT_URL.'wiquid/',
	)
);
