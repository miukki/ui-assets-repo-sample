
module Overcommit::Hook::PreCommit
  class GruntBeautifier < Base
  	def run
  		result = execute(%w[grunt beautifier])
  		if result.stdout =~ /Aborted due to warnings/
  			return :fail, result.stdout
  		end
  		:pass
  	end

  end
end

