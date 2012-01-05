/*

CollapsibleLists.js

An object allowing lists to dynamically expand and collapse

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* from Stephen's libs, added by danja */
// create the OnloadScheduler object
var OnloadScheduler =
    new function(){

      // store that the scheduled tasks have not yet been executed
      var executed = false;

      // initialise the lists of tasks
      var negativePriority = [];
      var positivePriority = [];

      /* Executes a set of tasks. The parameter is:
       *
       * tasks - an array of tasks to execute. If this optional parameter is
       *         omitted then all scheduled tasks are executed.
       */
      function execute(tasks){

        // check which tasks should be executed
        if (tasks instanceof Array){

          // execute the tasks
          for (var index = 0; index < tasks.length; index ++){
            try{
              tasks[index]();
            }catch (error){
              // ignore the error
            }
          }

        }else if (!executed){

          // store that the scheduled tasks have been executed
          executed = true;

          // execute the tasks
          for (var index = negativePriority.length - 1; index > 0; index --){
            execute(negativePriority[index]);
          }
          for (var index = 0; index < positivePriority.length; index ++){
            execute(positivePriority[index]);
          }

        }

      }

      /* Schedules a task to be executed. The parameters are:
       *
       * task     - the task to be executed, either as a function or as a string
       * priority - the priority of the task - this optional parameter defaults
       *            to 0
       */
      this.schedule = function(task, priority){

        // set the priority to 0 if it was not supplied
        if (!priority) priority = 0;

        // check whether the task has been supplied as a function
        if (task instanceof Function){

          // store the task in the appropriate list
          if (priority < 0){
            if (!negativePriority[-priority]) negativePriority[-priority] = [];
            negativePriority[-priority].push(task);
          }else{
            if (!positivePriority[priority]) positivePriority[priority] = [];
            positivePriority[priority].push(task);
          }

        }else{

          // schedule a function to execute the code string
          this.schedule(function(){eval(task)}, priority);

        }

      }

      // check which method of adding event listeners is supported
      if ('addEventListener' in document){

        // add a DOMContentLoaded event listener
        document.addEventListener('DOMContentLoaded', execute, false);

        // add a load event listener
        window.addEventListener('load', execute, false);

      }else{

        // check that the doScroll function is supported and this is not a frame
        if ('doScroll' in document.documentElement && window == window.top){

          // repeatedly check whether the page can be scrolled
          (function(){
            try{
              document.documentElement.doScroll('left');
              execute();
            }catch (error){
              window.setTimeout(arguments.callee, 0);
            }
          })();

        }

        // add an onreadystatechange event listener
        document.attachEvent(
            'onreadystatechange',
            function(){
              if (document.readyState == 'complete') execute();
            });

        // add a load event listener
        window.attachEvent('onload', execute);

      }

    }();


// create the CollapsibleLists object
var CollapsibleLists =
    new function(){

      /* Makes all lists with the class 'collapsibleList' collapsible. The
       * parameter is:
       *
       * doNotRecurse - true if sub-lists should not be made collapsible
       */
      this.apply = function(doNotRecurse){

        // loop over the unordered lists
        var uls = document.getElementsByTagName('ul');
        for (var index = 0; index < uls.length; index ++){

          // check whether this list should be made collapsible
          if (uls[index].className.match(/(^| )collapsibleList( |$)/)){

            // make this list collapsible
            this.applyTo(uls[index], true);

            // check whether sub-lists should also be made collapsible
            if (!doNotRecurse){

              // add the collapsibleList class to the sub-lists
              var subUls = uls[index].getElementsByTagName('ul');
              for (var subIndex = 0; subIndex < subUls.length; subIndex ++){
                subUls[subIndex].className += ' collapsibleList';
              }

            }

          }

        }

      };

      /* Makes the specified list collapsible. The parameters are:
       *
       * node         - the list element
       * doNotRecurse - true if sub-lists should not be made collapsible
       */
      this.applyTo = function(node, doNotRecurse){

        // loop over the list items within this node
        var lis = node.getElementsByTagName('li');
        for (var index = 0; index < lis.length; index ++){

          // check whether this list item should be collapsible
          if (!doNotRecurse || node == lis[index].parentNode){

            // prevent text from being selected unintentionally
            if (lis[index].addEventListener){
              lis[index].addEventListener(
                  'mousedown', function (e){ e.preventDefault(); }, false);
            }else{
              lis[index].attachEvent(
                  'onselectstart', function(){ event.returnValue = false; });
            }

            // add the click listener
            if (lis[index].addEventListener){
              lis[index].addEventListener(
                  'click', createClickListener(lis[index]), false);
            }else{
              lis[index].attachEvent(
                  'onclick', createClickListener(lis[index]));
            }

            // close the unordered lists within this list item
            toggle(lis[index]);

          }

        }

      };

      /* Returns a function that toggles the display status of any unordered
       * list elements with the specified node. The parameter is:
       *
       * node - the node containing the unordered list elements
       */
      function createClickListener(node){

        // return the function
        return function(e){

          // ensure the event object is defined
          if (!e) e = window.event;

          // toggle the state of the node if it was the target of the event
          if (node == (e.target ? e.target : e.srcElement)) toggle(node);

        };

      }

      /* Opens or closes the unordered list elements directly within the
       * specified node. The parameter is:
       *
       * node - the node containing the unordered list elements
       */
      function toggle(node){

        // determine whether to open or close the unordered lists
        var open = node.className.match(/(^| )collapsibleListClosed( |$)/);

        // loop over the unordered list elements with the node
        var uls = node.getElementsByTagName('ul');
        for (var index = 0; index < uls.length; index ++){

          // find the parent list item of this unordered list
          var li = uls[index];
          while (li.nodeName != 'LI') li = li.parentNode;

          // style the unordered list if it is directly within this node
          if (li == node) uls[index].style.display = (open ? 'block' : 'none');

        }

        // remove the current class from the node
        node.className =
            node.className.replace(
                /(^| )collapsibleList(Open|Closed)( |$)/, '');

        // if the node contains unordered lists, set its class
        if (uls.length > 0){
          node.className += ' collapsibleList' + (open ? 'Open' : 'Closed');
        }

      }

    }();
