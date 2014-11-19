<?php
/**
 * Created by PhpStorm.
 * User: panagiotis
 * Date: 19/11/2014
 * Time: 11:30
 */

namespace StapsSurvey\Libs;


class XML2Array {
    public static function parse($xml, $simpleNodes=array())
    {
        return self::node2array($xml, $simpleNodes);
    }

    protected static function node2array($node,$simpleNodes) {
        $output = array();
        //For every child create element
        foreach ($node->children() as $child) {
            $a = $child->getName();
            //If child has no children then is a string node, thus it can be appended as one
            if(!$child->children()) {
                $output[$a] = trim($child[0]);
            }
            //Else child is an object, thus call method for child and append result
            else {
                if(!in_array($a, $simpleNodes)) $a = Pluralization::pluralize($a);
                $v = self::node2array($child, $simpleNodes);
                if(!isset($output[$a])) {
                    $output[$a] = array();
                }
                array_push($output[$a], $v);
            }
        }

        if(is_array($output)) {
            //Append attributes to result as [@attrName = value]
            if(count($node->attributes())>0) {
                $attrs = array();
                foreach($node->attributes() as $attrName => $attrNode) {
                    $attrs['@'.$attrName] = trim($attrNode);
                }
                $output = array_merge($attrs, $output);
            }

            foreach ($output as $t => $v) {
                if(is_array($v) && count($v)==1 && in_array($t, $simpleNodes)) {
                    $output[$t] = $v[0];
                }
            }
        }
        return $output;
    }
} 